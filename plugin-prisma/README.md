# Blog

### Try It

```
docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name 'plugin-prisma' postgres:10.12
```

```
yarn -s prisma migrate save --experimental
yarn -s prisma migrate up --experimental
yarn -s prisma generate
```

```
npm install && nexus dev
```
