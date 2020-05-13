import { empty } from "joi"
import { settings, use } from "nexus"
import { prisma } from "nexus-plugin-prisma"

console.log(empty)

use(prisma())

// schema.addToContext((req) => {
//   return {
//     req,
//     db: {
//       users: {
//         newton: {
//           id: "1",
//           birthyear: "1649",
//           name: "Newton",
//         },
//       },
//     },
//   }
// })

settings.change({
  schema: {
    generateGraphQLSDLFile: "api.graphql",
  },
})
