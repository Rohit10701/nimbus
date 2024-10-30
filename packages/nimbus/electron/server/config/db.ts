import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(currentDir, 'database.sqlite')
    },
    useNullAsDefault: true 
});

export { db };
