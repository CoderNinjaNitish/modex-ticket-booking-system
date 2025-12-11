const db = require('../config/db');

async function getAllShows() {
  const result = await db.query(
    `SELECT * FROM shows ORDER BY start_time ASC`
  );
  return result.rows;
}

async function getSeatsByShowId(showId) {
  const result = await db.query(
    `SELECT id, seat_number, is_booked FROM seats 
     WHERE show_id = $1 ORDER BY seat_number ASC`,
    [showId]
  );
  return result.rows;
}

module.exports = {
  getAllShows,
  getSeatsByShowId,
};
