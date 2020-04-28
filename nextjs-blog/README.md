This combines what one builds in https://nextjs.org/learn with https://nexusjs.org.

The blog posts data remains file based as it was in the original tutorial. However, the client accesses it via the GraphQL api rather than through direct file system (the "database" here) interaction.

While it is not best practice to have Next.js static generation go through the API, it does here just to demonstrate the setup. This setup may be updated to be more realistic in the future.

This example is incomplete. It depends upon the resolution of https://github.com/graphql-nexus/nexus/issues/648. Its current limitations are:

1. Dev modes are not integrated. You need to run `npm run client:dev` and `npm run server:dev` in their own separate terminals.
1. Builds are not integrated. The lack of integration means you cannot deploy the full-stack app to Vercel. The Next.js app and Nexus app need to be deployed separately.
