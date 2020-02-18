import cors from "cors"
import { server } from "nexus-future"

server.custom(({ express }) => {
  /**
   * Try it out:
   *
   *    curl -v http://localhost:4000/graphql
   */
  express.use(cors())
})
