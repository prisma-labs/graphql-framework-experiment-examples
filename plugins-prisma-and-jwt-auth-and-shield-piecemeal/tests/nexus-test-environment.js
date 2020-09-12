require("dotenv").config();

const { Client } = require("pg");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const prismaBinary = "./node_modules/.bin/prisma";

/**
 * Custom tests environment for Nexus, Prisma and Postgres
 */
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    // Generate a unique schema identifier for this tests context
    this.schema = `test_${nanoid()}`;

    // Generate the pg connection string for the tests schema
    this.databaseUrl = `postgresql://postgres:postgres@localhost:5432/plugins-prisma-and-jwt-auth-and-shield-piecemeal-test?schema=${this.schema}`;
  }

  async setup() {
    await super.setup();

    // Set the required environment variable to contain the connection string
    // to our database tests schema
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;

    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} migrate up --create-db --experimental`)
  }

  async teardown() {
    // Drop the schema after the tests have completed
    const client = new Client({
      connectionString: this.databaseUrl,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;

