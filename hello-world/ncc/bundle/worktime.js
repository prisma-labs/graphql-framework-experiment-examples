"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma = __importStar(require("@prisma/sdk"));
const chalk_1 = __importDefault(require("chalk"));
const common_tags_1 = require("common-tags");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs-jetpack"));
const os = __importStar(require("os"));
const Path = __importStar(require("path"));
const defaults_1 = require("./lib/defaults");
if (process.env.LINK) {
    process.env.NEXUS_PRISMA_LINK = process.env.LINK;
}
/**
 * Pinned query-engine version. Calculated at build time and based on `@prisma/cli` version
 */
exports.PRISMA_QUERY_ENGINE_VERSION = require('@prisma/cli/package.json').prisma.version;
exports.plugin = (userSettings) => (p) => {
    const settings = defaults_1.withDefaults(userSettings, {
        migrations: true,
    });
    p.log.trace('start');
    p.hooks.build.onStart = async () => {
        await runPrismaGenerators(p);
    };
    p.hooks.create.onAfterBaseSetup = async (hctx) => {
        if (hctx.database === undefined) {
            throw new Error('Should never happen. Prisma plugin should not be installed if no database were chosen in the create workflow');
        }
        const datasource = renderDatasource(hctx.database);
        await Promise.all([
            fs.appendAsync('.gitignore', os.EOL +
                common_tags_1.stripIndent `
                # Prisma
                failed-inferMigrationSteps*
              `),
            fs.writeAsync('prisma/schema.prisma', datasource +
                os.EOL +
                common_tags_1.stripIndent `
              generator prisma_client {
                provider = "prisma-client-js"
              }
     
              model World {
                id         Int    @id @default(autoincrement())
                name       String @unique
                population Float
              }
            `),
            fs.writeAsync('prisma/.env', common_tags_1.stripIndent `
          DATABASE_URL="${renderConnectionURI({ database: hctx.database, connectionURI: hctx.connectionURI }, p.layout.project.name)}"
        `),
            fs.writeAsync('prisma/seed.ts', common_tags_1.stripIndent `
          import { PrismaClient } from '@prisma/client'

          const db = new PrismaClient()
          
          main()
          
          async function main() {
            const worlds = [
              {
                name: 'Earth',
                population: 6_000_000_000,
              },
              {
                name: 'Mars',
                population: 0,
              },
            ]

            // Could use Promise.all
            // Sequential here so that world IDs match the array order above

            let results = []

            for (const world of worlds) {
              results.push(await db.world.create({ data: world }))
            }

            console.log('Seeded: %j', results)
          
            db.disconnect()
          }
        `),
            fs.writeAsync(p.layout.sourcePath('graphql.ts'), common_tags_1.stripIndent `
              import { schema } from "nexus"
      
              schema.objectType({
                name: "World",
                definition(t) {
                  t.model.id()
                  t.model.name()
                  t.model.population()
                }
              })
      
              schema.queryType({
                definition(t) {
                  t.field("hello", {
                    type: "World",
                    args: {
                      world: schema.stringArg({ required: false })
                    },
                    async resolve(_root, args, ctx) {
                      const worldToFindByName = args.world ?? 'Earth'
                      const world = await ctx.db.world.findOne({
                        where: {
                          name: worldToFindByName
                        }
                      })
      
                      if (!world) throw new Error(\`No such world named "\${args.world}"\`)
      
                      return world
                    }
                  })
  
                  t.list.field('worlds', {
                    type: 'World',
                    resolve(_root, _args, ctx) { 
                      return ctx.db.world.findMany()
                    }
                  })
                }
              })
            `),
            fs.writeAsync(p.layout.sourcePath('app.ts'), common_tags_1.stripIndent `
          import { use } from 'nexus'
          import { prisma } from 'nexus-plugin-prisma'

          use(prisma())
        `),
        ]);
        if (hctx.connectionURI || hctx.database === 'SQLite') {
            p.log.info('Initializing development database...');
            // TODO expose run on nexus
            await p.packageManager.runBin('prisma migrate save --create-db --name init --experimental', {
                require: true,
            });
            await p.packageManager.runBin('prisma migrate up -c --experimental', {
                require: true,
            });
            p.log.info('Generating Prisma Client JS...');
            await p.packageManager.runBin('prisma generate', { require: true });
            p.log.info('Seeding development database...');
            await p.packageManager.runBin('ts-node prisma/seed', {
                require: true,
            });
        }
        else {
            p.log.info(common_tags_1.stripIndent `
            1. Please setup your ${hctx.database} and fill in the connection uri in your \`${chalk_1.default.greenBright('prisma/.env')}\` file.
          `);
            p.log.info(common_tags_1.stripIndent `
              2. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate save --experimental'))}\` to create your first migration file.
          `);
            p.log.info(common_tags_1.stripIndent `
            3. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate up --experimental'))}\` to migrate your database.
          `);
            p.log.info(common_tags_1.stripIndent `
          4. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma generate'))}\` to generate the Prisma Client.
        `);
            p.log.info(common_tags_1.stripIndent `
            5. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunBin('ts-node prisma/seed.ts'))}\` to seed your database.
          `);
            p.log.info(common_tags_1.stripIndent `
            6. Run \`${chalk_1.default.greenBright(p.packageManager.renderRunScript('dev'))}\` to start working.
          `);
        }
    };
    // generate
    p.hooks.generate.onStart = async () => {
        await runPrismaGenerators(p);
    };
    // dev
    p.hooks.dev.onStart = async () => {
        await runPrismaGenerators(p);
    };
    p.hooks.dev.onFileWatcherEvent = async (_event, file, _stats, watcher) => {
        p.log.info('settings', { settings });
        if (file.match(/.*schema\.prisma$/)) {
            if (settings.migrations === true) {
                await promptForMigration(p, watcher, file);
            }
            else {
                await runPrismaGenerators(p);
                watcher.restart(file);
            }
        }
    };
    p.hooks.dev.addToWatcherSettings = {
        // TODO preferably we allow schema.prisma to be anywhere but they show up in
        // migrations folder too and we don't know how to achieve semantic "anywhere
        // but migrations folder"
        watchFilePatterns: ['./schema.prisma', './prisma/schema.prisma'],
        listeners: {
            app: {
                ignoreFilePatterns: ['./prisma/**', './schema.prisma'],
            },
            plugin: {
                allowFilePatterns: ['./schema.prisma', './prisma/schema.prisma'],
            },
        },
    };
    return exports.plugin;
};
/**
 * Get the declared generator blocks in the user's PSL file
 */
async function getGenerators(schemaPath) {
    return await Prisma.getGenerators({
        schemaPath,
        printDownloadProgress: false,
        version: exports.PRISMA_QUERY_ENGINE_VERSION,
    });
}
/**
 * Compute the resolved settings of a generator which has its baked in manifest
 * but also user-provided overrides. This computes the merger of the two.
 */
function getGeneratorResolvedSettings(g) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        name: (_b = (_a = g.manifest) === null || _a === void 0 ? void 0 : _a.prettyName) !== null && _b !== void 0 ? _b : '',
        instanceName: (_d = (_c = g.options) === null || _c === void 0 ? void 0 : _c.generator.name) !== null && _d !== void 0 ? _d : '',
        output: (_h = (_f = (_e = g.options) === null || _e === void 0 ? void 0 : _e.generator.output) !== null && _f !== void 0 ? _f : (_g = g.manifest) === null || _g === void 0 ? void 0 : _g.defaultOutput) !== null && _h !== void 0 ? _h : '',
    };
}
const DATABASE_TO_PRISMA_PROVIDER = {
    SQLite: 'sqlite',
    MySQL: 'mysql',
    PostgreSQL: 'postgresql',
};
function renderDatasource(database) {
    const provider = DATABASE_TO_PRISMA_PROVIDER[database];
    return (common_tags_1.stripIndent `
      datasource db {
        provider = "${provider}"
        url      = env("DATABASE_URL")
      }
    ` + os.EOL);
}
const DATABASE_TO_CONNECTION_URI = {
    SQLite: (_) => 'file:./dev.db',
    PostgreSQL: (projectName) => `postgresql://postgres:postgres@localhost:5432/${projectName}`,
    MySQL: (projectName) => `mysql://root:<password>@localhost:3306/${projectName}`,
};
function renderConnectionURI(db, projectName) {
    if (db.connectionURI) {
        return db.connectionURI;
    }
    return DATABASE_TO_CONNECTION_URI[db.database](projectName);
}
/**
 * Execute all the generators in the user's PSL file.
 */
async function runPrismaGenerators(p, options = { silent: false }) {
    if (!options.silent) {
        p.log.info('Running Prisma generators ...');
    }
    const schemaPath = findPrismaSchema(p);
    loadEnv(p, schemaPath);
    p.log.trace('loading generators...');
    let generators = await getGenerators(schemaPath);
    p.log.trace('generators loaded.');
    if (!generators.find((g) => { var _a; return ((_a = g.options) === null || _a === void 0 ? void 0 : _a.generator.provider) === 'prisma-client-js'; })) {
        await scaffoldPrismaClientGeneratorBlock(p, schemaPath);
        // TODO: Generate it programmatically instead for performance reason
        generators = await getGenerators(schemaPath);
    }
    for (const g of generators) {
        const resolvedSettings = getGeneratorResolvedSettings(g);
        p.log.trace('generating', resolvedSettings);
        await g.generate();
        g.stop();
        p.log.trace('done generating', resolvedSettings);
    }
}
function loadEnv(p, schemaPath) {
    const schemaDir = Path.dirname(schemaPath);
    let envPath = Path.join(schemaDir, '.env');
    // Look next to `schema.prisma`, other look in project root
    if (!fs.exists(envPath)) {
        envPath = Path.join(p.layout.projectRoot, '.env');
    }
    if (!fs.exists(envPath)) {
        p.log.trace(`No .env file found. Looked at: ${envPath}`);
        return;
    }
    p.log.trace(`.env file found. Looked at: ${envPath}`);
    dotenv.config({ path: envPath });
}
exports.loadEnv = loadEnv;
/**
 * Find the PSL file in the project. If multiple are found a warning is logged.
 */
function findPrismaSchema(p) {
    const projectRoot = p.layout.projectRoot;
    let schemaPath = Path.join(projectRoot, 'schema.prisma');
    if (fs.exists(schemaPath)) {
        return schemaPath;
    }
    schemaPath = Path.join(projectRoot, 'prisma', 'schema.prisma');
    if (fs.exists(schemaPath)) {
        return schemaPath;
    }
    p.log.error(common_tags_1.stripIndent `
    We could not find any \`schema.prisma\` file. We looked in:
      - ${Path.join(projectRoot, 'schema.prisma')}
      - ${schemaPath}
    Please create one or check out the docs to get started here: http://nxs.li/nexus-plugin-prisma
  `);
    process.exit(1);
}
async function scaffoldPrismaClientGeneratorBlock(p, schemaPath) {
    const relativeSchemaPath = Path.relative(process.cwd(), schemaPath);
    p.log.warn(`A Prisma Client JS generator block is needed in your Prisma Schema at "${relativeSchemaPath}".`);
    p.log.warn('We scaffolded one for you.');
    const schemaContent = await fs.readAsync(schemaPath);
    const generatorBlock = common_tags_1.stripIndent `
      generator prisma_client {
        provider = "prisma-client-js"
      }
    `;
    await fs.writeAsync(schemaPath, `${generatorBlock}${os.EOL}${schemaContent}`);
}
async function promptForMigration(p, watcher, file) {
    watcher.pause();
    p.log.info('We detected a change in your Prisma Schema file.');
    p.log.info("If you're using Prisma Migrate, follow the step below:");
    p.log.info(`1. Run ${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate save --experimental'))} to create a migration file.`);
    p.log.info(`2. Run ${chalk_1.default.greenBright(p.packageManager.renderRunBin('prisma migrate up --experimental'))} to apply your migration.`);
    await p.prompt({
        type: 'confirm',
        name: 'confirm',
        message: 'Press Y to restart once your migration is applied',
        initial: true,
        yesOption: '(Y)',
        noOption: '(Y)',
        yes: 'Restarting...',
        no: 'Restarting...',
    });
    await runPrismaGenerators(p);
    watcher.restart(file);
}
//# sourceMappingURL=worktime.js.map