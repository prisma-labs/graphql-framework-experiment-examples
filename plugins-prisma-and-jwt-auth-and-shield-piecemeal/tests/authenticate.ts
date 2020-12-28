import { TestContext } from 'nexus/testing'

import { signupTestUser } from './signupTestUser'

export async function authenticate(ctx: TestContext) {
  const testUser = await signupTestUser(ctx)
  const {
    signup: { token },
  } = testUser
  ctx.client.headers.add('authorization', `Bearer ${token}`)
  return testUser
}
