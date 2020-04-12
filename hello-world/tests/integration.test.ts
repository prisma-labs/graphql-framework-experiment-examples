it("works", async () => {
  expect(
    await nexus.app.query(`
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
