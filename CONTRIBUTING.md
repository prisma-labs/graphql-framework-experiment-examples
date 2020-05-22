## Conventions

### Overview

Each Example should...

- Be in its own directory at the the root of this repo
- Have its directory named according to the conventions (see below)
- Use `npm`

### Naming

#### Cannonical Plugin Example

If it shows off a specific plugin then call it:

```
Pattern                   Examples

plugin-<plugin name>      plugin-prisma
```

#### Plugin Combination Example

If it shows off multiple plugins together in concert then call it:

```
Pattern                                         Examples

plugins-<plugin name>-[and-<plugin name>]+      plugins-prisma-and-jwt-auth
```

#### Tool Integration Example

If it shows off integration with another tool then call it:

```
Pattern               Examples

with-<tool name>      with-nextjs
```

#### Tool Integration Combination Example

If it shows off multiple tools together in concert then call it:

```
Pattern                                 Examples

with-<tool name>-[and-<tool name>]+     with-nextjs-and-vercel
```

#### Tool & Plugin Example

If the example shows integration with tools and plugins then call it:

```
Pattern

with-<tool name>-[and-<tool name>]+-and-plugins-<plugin name>-[and-<plugin name>]+

Examples

with-nextjs-and-plugins-prisma
with-nextjs-and-vercel-and-plugins-prisma
with-nextjs-and-vercel-and-plugins-prisma-and-jwt-auth
```
