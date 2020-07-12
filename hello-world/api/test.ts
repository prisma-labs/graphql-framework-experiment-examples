import { createTestContext, TestContext } from "nexus/testing"

let ctx = {} as TestContext

function gql(strings: TemplateStringsArray) {
  const document = strings.join("")
  return ctx.client.send(document)
}

beforeAll(async () => {
  const testContext = await createTestContext()
  Object.assign(ctx, testContext)
  await ctx.app.start()
})

afterAll(async () => {
  await ctx.app.stop()
})

it("works", async () => {
  const result = await gql`
    query {
      users {
        name
      }
    }
  `
  expect(result).toMatchInlineSnapshot(`
    Object {
      "users": Array [
        Object {
          "id": "1",
        },
      ],
    }
  `)
})
