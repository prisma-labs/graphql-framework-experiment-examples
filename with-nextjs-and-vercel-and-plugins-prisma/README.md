This example shows how to add a Nexus api endpoint to a nextjs project. You can try out the deployed version right now [here](https://with-nextjs-and-vercel-and-plugins-prisma.now.sh). For an overview of the state of Next.js integration with Nexus refer to [the Next.js recipe](https://nxs.li/integration/nextjs).

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
