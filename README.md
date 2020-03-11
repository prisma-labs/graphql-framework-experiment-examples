# examples

This repo includes various examples using [Nexus](https://nexusjs.org).

## Development Workflow

The following describes how to leverage these examples in conjunction with development on the framework itself.

### Getting Started

1. Checkout and link [`nexus-future`](https://github.com/graphql-nexus/nexus-future).

   ```
   mkdir -p ~/projects/graphql-nexus
   git clone graphql-nexus/nexus-future ~/projects/graphql-nexus/nexus-future
   cd ~/projects/graphql-nexus/nexus-future

   yarn link
   ```

2. Checkout this repo. Must be a peer folder to `nexus-future` (see details).

   ```
   mkdir -p ~/projects/graphql-nexus
   git clone graphql-nexus/examples ~/projects/graphql-nexus/examples
   cd ~/projects/graphql-nexus/examples
   ```

3. For each example in this repo that you want to work with

   ```
   cd <name-of-example>
   yarn
   ```

4. Now that you are linked up for one or more examples. Enter dev mode in `nexus-future` to begin your feedback loop.

   ```
   cd ~/projects/graphql-nexus/nexus-future
   yarn dev
   ```

### Gotchyas

1. Transient dependencies installed inside an example app via its `"nexus-future": "../../../nexus/nexus-future"` dep are not linked/dynamic meaning if the dependency tree of nexus-future changes you need to take manual action to reflect this change in the examples:

   ```
   yarn install --force
   ```

1. `node_modules/.bin/nexus-future` does not exist even after installation.

   1. In the `nexus-future` project run `yarn build`
   2. In an example run `yarn --force`

### Details

1. All examples run `yarn link nexus-future` after install so you never need to remember to do this.

2. About `"nexus-future": "../../../nexus/nexus-future"` in package.json

   1. This forces you to clone `nexus-future` and `nexus-future-examples` as folders adjacent to how they are on github.

   2. This is so that the depdenencies of nexus-future make it into the dependency tree of the example app like they would during a normal nexus-future install. The _local_ presence of these transient dependencies is needed for certain functionality to work correctly.

      More detail:

      If we did not have this, if we just `yarn link nexus-future`, we would get only a `node_modules/nexus-future` entry. But this is not what we want. One reason is that, for example, `yarn nexus-future build` will fail at compile time (with a non-obvious error message) because typegen will fail (silently) because `import { core } from 'nexus'` will be an `import` whose props are all `any`.
