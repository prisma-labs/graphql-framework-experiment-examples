import { empty } from "joi"
import { settings } from "nexus"

console.log(empty)

// use(prisma())

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
