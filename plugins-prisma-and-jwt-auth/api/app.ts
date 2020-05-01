import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { protectedPaths } from './permissions'
import { APP_SECRET } from './utils'

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({
    appSecret: APP_SECRET,
    protectedPaths
}))