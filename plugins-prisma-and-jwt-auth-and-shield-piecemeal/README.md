# plugins-prisma-and-jwt-auth-and-shield-piecemeal

### Try It

```
npm install
```

```
docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name 'plugins-prisma-and-jwt-auth-and-shield-piecemeal' postgres:10.12
```

```
npm run db:save
npm run db:up
```

```
npm run generate
npm run db:seed
```

```
npm run dev
```

> Jest tests MUST be run with `--runInBand` option or else DB connection may timeout and fail tests. See `test` in the `package.json`'s `scripts`.
```
npm test
```
