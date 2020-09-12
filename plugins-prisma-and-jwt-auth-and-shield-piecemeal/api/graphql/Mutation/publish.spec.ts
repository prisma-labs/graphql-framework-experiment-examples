import { authenticate } from '../../../tests/authenticate'
import { createTestContext } from '../../../tests/create-test-context'
import { createDraftPost } from '../../../tests/createDraftPost'

const ctx = createTestContext()

it('should allow users to published their post', async (done) => {
  await authenticate(ctx)
  const draftResult = await createDraftPost(ctx)
  expect(draftResult.createDraft.published).toEqual(false)

  // Publish the previously created draft
  const publishResult = await ctx.client.send(
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
    { draftId: draftResult.createDraft.id },
  )

  expect(publishResult.publish.published).toEqual(true)
  done()
})

it('should require the post owner', async (done) => {
  await authenticate(ctx)
  const draftResult = await createDraftPost(ctx)
  // change user
  await authenticate(ctx)

  await expect(
    ctx.client.send(
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
      { draftId: draftResult.createDraft.id },
    ),
  ).rejects.toThrow()
  done()
})
