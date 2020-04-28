This combines what one builds in https://nextjs.org/learn with https://nexusjs.org.

The Nexus additions just show how to integrate Nexus into your app. It does not serve any practical purpose. You can use the API to query posts.

This example is incomplete. It depends upon the resolution of https://github.com/graphql-nexus/nexus/issues/648. Its current limitations are:

1. Dev modes are not integrated. You need to run `npm run client:dev` and `npm run server:dev` in their own separate terminals.
1. Builds are not integrated. The lack of integration means you cannot deploy the full-stack app to Vercel. The Next.js app and Nexus app need to be deployed separately.
