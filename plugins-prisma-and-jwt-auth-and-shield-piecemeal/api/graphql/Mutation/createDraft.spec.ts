import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('should ensures that a draft can be created', async (done) => {
  await authenticate(ctx)

  // Create a new draft
  const draftResult = await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Nexus", content: "...") {            # 2
        id
        title
        content
        published
      }
    }
  `)

  // Snapshot that draft and expect `published` to be false
  expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "content": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
      },
    }
  `)
  done()
})

it('should require authenticated user', async (done) => {
  await expect(
    ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Nexus", content: "...") {            # 2
        id
        title
        content
        published
      }
    }
  `),
  ).rejects.toThrow()
  done()
})
