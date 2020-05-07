This example shows how to add a Nexus api endpoint to a nextjs project. You can try out the deployed version right now [here](https://integration-nextjs-with-plugin-prisma.now.s).

#### Setting up for development

1. Start a postgres database

   ```
   db:start
   ```

1. Initialize your db schema

   ```
   db:migrate
   ```

1. Source development environment variables (we use [direnv](https://direnv.net/))

   ```
   direnv
   ```

1. Start nextjs dev mode

   ```
   npm run dev
   ```

1. In another terminal start Nexus reflection to benefit from the type safety that Nexus can give you.

   ```
   npm run nexus:reflection
   ```

#### Setting up for deployment

1. Setup an account with [Vercel](https://vercel.com/)

1. Provision a free postgres database with heroku

   ```
   heroku create
   heroku addons:create heroku-postgresql
   ```

1. Copy the connection URL

   ```
   heroku pg:credentials:url
   ```

1. Setup `DATABASE_URL` environment variable (add to all stages)

   ```
   now env add DATABASE_URL
   ```

1. From now on you can just deploy

   ```
   npm run deploy:preview
   ```

#### Migrations

1. When you are running Nexus' dev mode then Nexus will take care of migrating your development databse

1. To migrate the production database

   ```
   now env pull
   ```

   Export the `DATABASE_URL` into your shell.

   ```
   npm run db:migrate
   ```

#### Notes

1. With `compilerOptions.noEmit` set to `true` in tsconfig, treat `nexus build` as a check step to run in your tests.

1. The following are some minor limitations that you won't find in a "normal" Nexus project.

   1. Make sure nextjs nexus api modules are symmetrical with regard to graphql schema imports. This means do not put graphql schema code into them. The reason for this is in nextjs dev mode state is shraed between them and that breaks the fragile Nexus assembly system.

      Note: This is low-level stuff that we hope to make go away sooner than later. So don't invest too much in trying to understand the internals here.

   1. Run `app.assenble()` before accessing the server handlers.
