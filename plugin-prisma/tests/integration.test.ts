/**
 * @jest-environment ./tests/environments/prisma
 */

import { createTestContext, TestContext } from 'nexus/testing'

let ctx: TestContext

beforeAll(async () => {
  ctx = await createTestContext()
})

beforeAll(async () => {
  await ctx.app.start()
})

afterAll(async () => {
  await ctx.app.stop()
})

it('works', async () => {
  expect(
    await ctx.client.send(`
      query {
        people {
          id
        }
      }
    `)
  ).toMatchInlineSnapshot(`
    Object {
      "people": Array [],
    }
  `)
})
