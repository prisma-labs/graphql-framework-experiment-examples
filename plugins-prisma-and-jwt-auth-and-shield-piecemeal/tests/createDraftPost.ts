import { TestContext } from 'nexus/testing'

export async function createDraftPost(ctx: TestContext) {
  return ctx.client.send(`                 # 1
    mutation {
      createDraft(title: "Nexus", content: "...") {            # 2
        id
        title
        content
        published
      }
    }
  `)
}
