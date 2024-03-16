import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user: 'postgres',
    password: '150302',
    host: 'localhost',
    port: 5432,
    database: 'users',
});


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
