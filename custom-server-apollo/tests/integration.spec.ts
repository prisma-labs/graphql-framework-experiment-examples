import { createTestContext, TestContext } from "nexus-future/testing"

let ctx: TestContext

beforeAll(async () => {
  ctx = await createTestContext()
  await ctx.app.server.start()
})

afterAll(async () => {
  await ctx.app.server.stop()
})

it("works", async () => {
  expect(
    await ctx.app.query(`
    query {
      users {
        id
      }
    }
  `)
  ).toMatchInlineSnapshot(`
    Object {
      "users": Array [
        Object {
          "id": "1",
        },
      ],
    }
  `)
})
