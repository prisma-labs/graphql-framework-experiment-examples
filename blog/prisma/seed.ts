import { PrismaClient } from '@prisma/client'
import { name } from 'faker'

main()

async function main() {
  const db = new PrismaClient()
  const result = await db.users.create({
    data: {
      name: name.firstName(),
      rating: 0.5,
      blog: {
        create: {
          name: name.title(),
        },
      },
      role: 'AUTHOR',
    },
  })

  console.log('added new author and blog:\n', result)

  await db.disconnect()
}
