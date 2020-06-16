import Client from "../client"

const client = Client.createClient({ url: "http://localhost:4000/graphql" })

let ctx = {} as {
  client: typeof client
}

ctx.client = client

beforeAll(async () => {
  // const testContext = await createTestContext()
  // Object.assign(ctx, testContext)
  // await ctx.app.start()
})

afterAll(async () => {
  // await ctx.app.stop()
})

it("works", async () => {
  expect(
    await ctx.client.query({
      users: {
        id: true,
      },
    })
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
