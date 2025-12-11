// src/testDb.js
const db = require('./config/db');

async function test() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('DB connected. Server time:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection error:', err.message || err);
    process.exit(1);
  }
}

test();
