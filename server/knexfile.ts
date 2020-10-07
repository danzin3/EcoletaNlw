import path from 'path';

/** Comando para rodar as migrations:
 * npx knex migrate:latest --knexfile knexfile.ts migrate:latest
 */

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname,'src','database','banco.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname,'src','database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'src','database', 'seeds')
    },
    useNullAsDefault: true,
};