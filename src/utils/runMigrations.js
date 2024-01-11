import { Client } from 'pg';
import Postgrator from 'postgrator';
import path from 'path';

const client = new Client();

await client.connect();

const postgrator = new Postgrator({
  migrationPattern: path.join(__dirname + '../../../migrations/*'),
  driver: 'pg',
  database: process.env.PGDATABASE,
  execQuery: (query) => client.query(query),
});

const appliedMigrations = await postgrator.migrate();
console.log('Applied ' + appliedMigrations.length + ' migrations.');

await client.end();
