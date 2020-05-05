This example shows how to add a Nexus api endpoint to a nextjs project. The nextjs project herein is based upon what one builds in https://nextjs.org/learn.

Some things to keep in mind:

1. While developing, run `npm run nexus:reflection` in a separate terminal (to `npm run dev`) to benefit from the type safety that Nexus gives you.
1. With `compilerOptions.noEmit` set to `true` in tsconfig, treat `nexus build` as a check step to run in your tests.
1. Unlike a normal Nexus project, you must make sure to import all your graphql modules into your graphql api entrypoint.
1. The version of Nexus being used is a PR release. This is bleeding edge unstable stuff!
