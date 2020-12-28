import { nanoid } from 'nanoid'

import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('should allow new user to signup with name, email and password', async (done) => {
  const expectedName = `Name ${nanoid()}`
  const expectedEmail = `email_${nanoid()}@email.com`

  const signupOutput = await ctx.client.send(`
      mutation {
        signup(name: "${expectedName}", email: "${expectedEmail}", password: "987654321") {
          token
          user {
            name
            email
          }
        }
      }
    `)

  expect(signupOutput.signup.user.name).toEqual(expectedName)
  expect(signupOutput.signup.user.email).toEqual(expectedEmail)
  done()
})
