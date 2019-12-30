# pumpkins-examples

This repo supports a link workflow. The main reason we cannot put these examples into the pumpkins repo is because linking within the link source seems to get us into an `ELOOP` error.

## Getting Started

1. Checkout and link the [`pumpkins`](https://github.com/prisma/pumpkins) repo.

   ```
   mkdir -p ~/projects/pumpkins
   git clone prisma/pumpkins ~/projects/pumpkins
   cd ~/projects/pumpkins

   yarn link
   ```

2. Checkout this repo. Must be a peer folder to `pumpkins` (see details).

   ```
   mkdir -p ~/projects/pumpkins-examples
   git clone primsa/pumpkins-examples ~/projects/pumpkins-examples
   cd ~/projects/pumpkins-examples
   ```

3. For each example in this repo that you want to work with

   ```
   cd <name-of-example>
   yarn
   ```

4. Now that you are linked up for one or more examples. Enter dev mode in `pumpkins` to begin your feedback loop.

   ```
   cd ~/projects/pumpkins
   yarn dev
   ```

## Gotchyas

1. Transient dependencies installed inside an example app via its `"pumpkins": "../../pumpkins"` dep are not linked/dynamic meaning if the dependency tree of pumpkins changes you need to take manual action to reflect this change in the examples:

   ```
   yarn install --force
   ```

1. `node_modules/.bin/santa` does not exist even after installation.

   1. In your `santa` dir `../../graphql-santa` run `yarn build`
   1. Back here, run `yarn --force`

## Details

1. All examples run `yarn link pumpkins` after install so you never need to remember to do this.

2. About `"pumpkins": "../../pumpkins"` in package.json

   1. This forces you to clone pumpkins and pumpkins examples as peer folders.

   2. This is so that the depdenencies of pumpkins make it into the dependency tree
      of the example app like they would during a normal pumpkins install. The _local_ presence of these transient dependencies is needed for certain functionality to work correctly.

      More detail:

      If we did not have this, if we just `yarn link pumpkins`, we would get only a `node_modules/pumpkins` entry. But this is not what we want. One reason is that, for example, `yarn pumpkins build` will fail at compile time (with a non-obvious error message) because typegen will fail (silently) because `import { core } from 'nexus'` will be an `import` whose props are all `any`.
