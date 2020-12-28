import { TestContext } from 'nexus/testing'

export function unauthenticate(ctx: TestContext): void {
  if (ctx.client.headers.has('authorization')) {
    ctx.client.headers.del('authorization')
  }
}
