This example shows how to add a Nexus api endpoint to a nextjs project. You can try out the deployed version right now [here](https://nextjs-blog-one-lyart.now.sh). Some things to keep in mind:

1. While developing, run `npm run nexus:reflection` in a separate terminal (to `npm run dev`) to benefit from the type safety that Nexus gives you.
1. With `compilerOptions.noEmit` set to `true` in tsconfig, treat `nexus build` as a check step to run in your tests.
1. The following are some minor limitations that you won't find in a "normal" Nexus project.

   1. Make sure nextjs nexus api modules are symmetrical with regard to graphql schema imports. This means do not put graphql schema code into them. The reason for this is in nextjs dev mode state is shraed between them and that breaks the fragile Nexus assembly system.

      Note: This is low-level stuff that we hope to make go away sooner than later. So don't invest too much in trying to understand the internals here.

   1. Run `app.assenble()` before accessing the server handlers.
