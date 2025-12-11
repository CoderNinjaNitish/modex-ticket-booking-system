// src/controllers/adminController.js
const db = require('../config/db');

async function createShow(req, res) {
  const { name, type, start_time, total_seats } = req.body;

  if (!name || !type || !start_time) {
    return res.status(400).json({ error: 'name, type and start_time are required' });
  }

  try {
    const insertText = `
      INSERT INTO shows (name, type, start_time, total_seats)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(insertText, [name, type, start_time, total_seats || null]);
    const show = result.rows[0];

    // if total_seats provided, generate seat rows
    if (total_seats && Number(total_seats) > 0) {
      await db.query(
        `INSERT INTO seats (show_id, seat_number)
         SELECT $1, generate_series(1, $2);`,
        [show.id, Number(total_seats)]
      );
    }

    return res.status(201).json({ show });
  } catch (err) {
    console.error('createShow error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createShow,
};
