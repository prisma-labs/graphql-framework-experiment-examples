import { Plugin } from 'pumpkins'

export type Context = {
  a: 1
}

export default {
  name: 'myplugin',
  context: {
    typeSourcePath: __filename,
    create() {
      return {
        a: 1,
      }
    },
  },
} as Plugin<Context>
