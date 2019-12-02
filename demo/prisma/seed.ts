import { Photon } from '@prisma/photon'
import { name } from 'faker'

main()

async function main() {
  const photon = new Photon()
  const result = await photon.users.create({
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

  await photon.disconnect()
}
