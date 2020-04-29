This combines what one builds in https://nextjs.org/learn with https://nexusjs.org.

The Nexus additions just show how to integrate Nexus into your app. It does not serve any practical purpose. You can use the API to query posts.

This example is incomplete. It depends upon the resolution of https://github.com/graphql-nexus/nexus/issues/648. Its current limitations are:

1. Dev modes are not integrated. You need to run `npx next dev` and `npm run nexus:reflection` in their own separate terminals. The latter is simply used to run reflection. The Nexus server is actually run by Nextjs.
