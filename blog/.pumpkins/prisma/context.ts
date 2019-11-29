
      import { Photon } from '/Users/jasonkuhrt/projects/prisma/pumpkins-examples/blog/node_modules/@prisma/photon'
      
      export type Context = {
        photon: Photon
      }
      
      export const context: Context = {
        photon: new Photon(),
      }
    