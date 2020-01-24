import { createTestContext } from 'graphql-santa/testing'

beforeEach(async () => {
  const ctx = await createTestContext()
})

// https://prisma-labs.github.io/graphql-santa/#/guides/testing?id=with-a-database
