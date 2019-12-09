import { Plugin } from 'pumpkins'

export type Context = {
  a: 1
}

export default {
  name: 'myplugin',
  context: {
    typeGen: {
      fields: {
        a: 'number',
      },
    },
    create() {
      return {
        a: 1,
      }
    },
  },
} as Plugin<Context>
