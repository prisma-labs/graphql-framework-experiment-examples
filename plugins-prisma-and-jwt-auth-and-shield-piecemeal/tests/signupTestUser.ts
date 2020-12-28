import { nanoid } from 'nanoid'
import { TestContext } from 'nexus/testing'

export const SIGNUP_TEST_USER_PASSWORD = `123456`

/**
 * Generate and signup a unique user
 *
 * @param ctx
 */
export async function signupTestUser(ctx: TestContext) {
  const UserName = `Tester ${nanoid()}`
  const UserEmail = `tester_${nanoid()}@email.com`
  const UserPassword = SIGNUP_TEST_USER_PASSWORD

  return ctx.client.send(`
    mutation {
      signup(name: "${UserName}", email: "${UserEmail}", password: "${UserPassword}") {
        token
        user {
          id
          name
          email
        }
      }
    }
  `)
}
