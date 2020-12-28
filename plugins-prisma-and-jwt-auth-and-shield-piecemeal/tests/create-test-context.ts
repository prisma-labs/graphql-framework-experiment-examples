import {
  TestContext,
  createTestContext as originalCreateTestContext,
} from 'nexus/testing'
import { PrismaClient } from '@prisma/client'

import { unauthenticate } from './unauthenticate'

export function createTestContext(): TestContext {
  const ctx = {} as TestContext

  beforeAll(async () => {
    await Object.assign(ctx, await originalCreateTestContext())
    await ctx.app.start()
  })

  afterEach(() => {
    unauthenticate(ctx)
  })

  afterAll(async () => {
    // get runtime ctx property "db" added by nexus-plugin-prisma
    const { db } = ctx.app as any;
    if(db && db.client) {
      const client:PrismaClient = db.client;
      await client.disconnect()
    }
    await ctx.app.stop()
  })

  return ctx
}
