/**
 * This file is your server entrypoint. Don't worry about its emptyness, Nexus handles everything for you.
 * However, if you need to add settings, enable plugins, schema middleware etc, this is place to do it.
 * Below are some examples of what you can do. Uncomment them to try them out!
 */

/**
 * Change a variety of settings
 */

// import { settings } from 'nexus'
//
// settings.change({
//   server: {
//     port: 4001
//   }
// })

/**
 * Add some schema middleware
 */

// import { schema } from 'nexus'
//
// schema.middleware((_config) => {
//   return async (root, args, ctx, info, next) {
//     ctx.log.trace('before resolver')
//     await next(root, args, ctx, info)
//     ctx.log.trace('after resolver')
//   }
// })

/**
 * Enable the Prisma plugin. (Needs `nexus-plugin-prisma` installed)
 */

// import { use } from 'nexus'
// import { prisma } from 'nexus-plugin-prisma'
//
// use(prisma())