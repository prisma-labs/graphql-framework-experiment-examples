import { setupTest, TestContext } from 'graphql-santa/testing'

let testCtx: TestContext

beforeAll(async () => {
  testCtx = await setupTest()
})

afterAll(async () => {
  await testCtx.teardown()
})

it('returns some users', async () => {
  const result = await testCtx.app.query(`{
    users {
      id
      name
    }
  }`)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "users": Array [
        Object {
          "id": "1",
          "name": "Newton",
        },
      ],
    }
  `)
})
