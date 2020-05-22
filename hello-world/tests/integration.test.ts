import { createTestContext, TestContext } from "nexus/testing"

let ctx = {} as TestContext

beforeAll(async () => {
  const testContext = await createTestContext()
  Object.assign(ctx, testContext)
  await ctx.app.start()
})

afterAll(async () => {
  await ctx.app.stop()
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
