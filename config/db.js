const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
          }
        : {
              host:     process.env.DB_HOST,
              port:     process.env.DB_PORT,
              database: process.env.DB_NAME,
              user:     process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              ssl: isProduction ? { rejectUnauthorized: false } : false,
          }
);

// Test connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Database connected successfully!');
        release();
    }
});

module.exports = pool;
