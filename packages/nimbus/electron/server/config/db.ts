import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

const db = knex({
    client: 'better-sqlite3',
    connection: {
        filename: path.join(currentDir, 'database.sqlite')
    },
    useNullAsDefault: true 
});


async function initializeDatabase() {
    try {
        const tableExists = await db.schema.hasTable('MockApiData');

        if (!tableExists) {
            await db.schema.createTable('MockApiData', (table) => {
                table.string('id').primary(); 
                table.string('schema'); 
                table.string('data'); 
                table.string('createdAt'); 
                table.string('updatedAt');
                table.string('version')
                table.string('metadata'); 
            });
            console.log('Table MockApiData created successfully.');
        } else {
            console.log('Table MockApiData already exists.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
initializeDatabase()

export { db };
