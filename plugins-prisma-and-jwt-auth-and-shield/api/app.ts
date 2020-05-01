import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { shield } from 'nexus-plugin-shield'
import { rules } from './permissions'
import { APP_SECRET } from './utils'

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({
    appSecret: APP_SECRET
}))

// Enables the Shield plugin
use(shield({
    rules
}))