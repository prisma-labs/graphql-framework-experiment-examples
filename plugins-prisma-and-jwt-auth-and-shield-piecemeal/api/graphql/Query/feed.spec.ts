import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'

const ctx = createTestContext()

it('should only display published posts', async (done) => {
  await authenticate(ctx)
  await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Feed Post 1", content: "should not be in feed...") {            # 2
        id
        title
        content
        published
      }
    }
  `)
  const draftResult2 = await ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Feed Post 2", content: "should be in feed...") {            # 2
        id
        title
        content
        published
      }
    }
  `)
  await ctx.client.send(
    `
    mutation publishDraft($draftId: Int!) {
      publish(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
    { draftId: draftResult2.createDraft.id },
  )

  const feedResult = await ctx.client.send(`
    query {
      feed {
        id
        title
        content
        published
      }
    }
  `)

  expect(feedResult).toMatchInlineSnapshot(`
    Object {
      "feed": Array [
        Object {
          "content": "should be in feed...",
          "id": 2,
          "published": true,
          "title": "Feed Post 2",
        },
      ],
    }
  `)
  done()
})
