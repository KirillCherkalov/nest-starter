const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(process.cwd(), '.env'));
const config = dotenv.parse(file);

const migrationConfig = {
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  migrationsTableName: "custom_migration_table",
  migrations: ["db/migrations/*.ts"],
  cli: {
    migrationsDir: "db/migrations",
  },
};

module.exports = migrationConfig;
