# Development Workflow

The following describes how to leverage these examples in conjunction with development on the framework itself.

### Getting Started

1. Checkout and link [`nexus`](https://github.com/graphql-nexus/nexus).

   ```
   mkdir -p ~/projects/graphql-nexus
   git clone graphql-nexus/nexus ~/projects/graphql-nexus/nexus
   cd ~/projects/graphql-nexus/nexus

   yarn link
   ```

2. For each example in this repo that you want to work with

   ```
   cd <name-of-example>
   yarn
   ```

3. Now that you are linked up for one or more examples. Enter dev mode in `nexus` to begin your feedback loop.

   ```
   cd ~/projects/graphql-nexus/nexus
   yarn dev
   ```

### Gotchyas

1. Transient dependencies installed inside an example app via its linked `nexus` dep are not linked/dynamic meaning if the dependency tree of nexus-future changes you need to take manual action to reflect this change in the examples:

   ```
   yarn install --force
   ```

1. `node_modules/.bin/nexus` does not exist even after installation.

   1. In the `nexus` project run `yarn build`
   2. In an example run `yarn --force`

### Details

1. All examples run `yarn link nexus` after install so you never need to remember to do this.
