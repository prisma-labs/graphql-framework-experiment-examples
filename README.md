# graphql-santa-examples

This repo supports a link workflow. The main reason we cannot put these examples into the graphql-santa repo is because linking within the link source seems to get us into an `ELOOP` error.

## Getting Started

1. Checkout and link the [`graphql-santa`](https://github.com/prisma/graphql-santa) repo.

   ```
   mkdir -p ~/projects/graphql-santa
   git clone prisma/graphql-santa ~/projects/graphql-santa
   cd ~/projects/graphql-santa

   yarn link
   ```

2. Checkout this repo. Must be a peer folder to `graphql-santa` (see details).

   ```
   mkdir -p ~/projects/graphql-santa-examples
   git clone primsa/graphql-santa-examples ~/projects/graphql-santa-examples
   cd ~/projects/graphql-santa-examples
   ```

3. For each example in this repo that you want to work with

   ```
   cd <name-of-example>
   yarn
   ```

4. Now that you are linked up for one or more examples. Enter dev mode in `graphql-santa` to begin your feedback loop.

   ```
   cd ~/projects/graphql-santa
   yarn dev
   ```

## Gotchyas

1. Transient dependencies installed inside an example app via its `"graphql-santa": "../../graphql-santa"` dep are not linked/dynamic meaning if the dependency tree of graphql-santa changes you need to take manual action to reflect this change in the examples:

   ```
   yarn install --force
   ```

1. `node_modules/.bin/santa` does not exist even after installation.

   1. In your `santa` dir `../../graphql-santa` run `yarn build`
   1. Back here, run `yarn --force`

## Details

1. All examples run `yarn link graphql-santa` after install so you never need to remember to do this.

2. About `"graphql-santa": "../../graphql-santa"` in package.json

   1. This forces you to clone graphql-santa and graphql-santa examples as peer folders.

   2. This is so that the depdenencies of graphql-santa make it into the dependency tree
      of the example app like they would during a normal graphql-santa install. The _local_ presence of these transient dependencies is needed for certain functionality to work correctly.

      More detail:

      If we did not have this, if we just `yarn link graphql-santa`, we would get only a `node_modules/graphql-santa` entry. But this is not what we want. One reason is that, for example, `yarn graphql-santa build` will fail at compile time (with a non-obvious error message) because typegen will fail (silently) because `import { core } from 'nexus'` will be an `import` whose props are all `any`.
