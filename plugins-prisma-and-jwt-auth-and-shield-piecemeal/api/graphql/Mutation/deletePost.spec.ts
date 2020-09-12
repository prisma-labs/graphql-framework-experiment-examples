import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'
import { createDraftPost } from '../../../tests/createDraftPost'

const ctx = createTestContext()

it('should allow a Post owner to delete their post', async (done) => {
  await authenticate(ctx)
  const draftResult = await createDraftPost(ctx)
  const postsBeforeDelete = await ctx.app.db.client.post.findMany()

  await ctx.client.send(
    `
    mutation deleteAPost($draftId: Int!) {
      deletePost(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id },
  )

  const postsAfterDelete = await ctx.app.db.client.post.findMany()
  expect(postsAfterDelete.length).toEqual(postsBeforeDelete.length - 1)
  done()
})

it('should reject unauthenticated users', async (done) => {
  await expect(
    ctx.client.send(
      `
    mutation deleteAPost($draftId: Int!) {
      deletePost(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
      { draftId: 1234 },
    ),
  ).rejects.toThrow()
  done()
})
