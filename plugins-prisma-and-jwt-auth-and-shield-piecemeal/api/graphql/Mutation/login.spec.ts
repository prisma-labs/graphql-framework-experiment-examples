import { createTestContext } from '../../../tests/create-test-context'
import {
  SIGNUP_TEST_USER_PASSWORD,
  signupTestUser,
} from '../../../tests/signupTestUser'

const ctx = createTestContext()

it('should allow user with valid email and password', async (done) => {
  const {
    signup: {
      user: { id, name, email },
    },
  } = await signupTestUser(ctx)

  const {
    login: { user },
  } = await ctx.client.send(`
      mutation {
        login(email: "${email}", password: "${SIGNUP_TEST_USER_PASSWORD}") {
          token
          user {
            id
            name
            email
          }
        }
      }
    `)

  expect(user).toMatchInlineSnapshot(`
      Object {
        "email": "${email}",
        "id": ${id},
        "name": "${name}",
      }
    `)
  done()
})

it('should reject invalid email', async (done) => {
  await signupTestUser(ctx)

  await expect(
    ctx.client.send(`
      mutation {
        login(email: "wrong@email.com", password: "${SIGNUP_TEST_USER_PASSWORD}") {
          token
          user {
            id
            name
            email
          }
        }
      }
    `),
  ).rejects.toThrow()
  done()
})

it('should reject invalid password', async (done) => {
  const {
    signup: {
      user: { email },
    },
  } = await signupTestUser(ctx)

  await expect(
    ctx.client.send(`
      mutation {
        login(email: "${email}", password: "wrongpassword") {
          token
          user {
            id
            name
            email
          }
        }
      }
    `),
  ).rejects.toThrow()
  done()
})
