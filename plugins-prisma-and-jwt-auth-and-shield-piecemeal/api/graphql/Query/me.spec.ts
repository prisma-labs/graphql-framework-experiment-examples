import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('should allow lookup of current user', async (done) => {
  const {
    signup: {
      user: { id, name, email },
    },
  } = await authenticate(ctx)

  const meResult = await ctx.client.send(`
    query {
      me {
        id
        name
        email
      }
    }
  `)

  expect(meResult).toMatchInlineSnapshot(`
    Object {
      "me": Object {
        "email": "${email}",
        "id": ${id},
        "name": "${name}",
      },
    }
  `)
  done()
})

it('should require authenticated user', async (done) => {
  await expect(
    ctx.client.send(`
    query {
      me {
        id
        name
        email
      }
    }
  `),
  ).rejects.toThrow()
  done()
})
