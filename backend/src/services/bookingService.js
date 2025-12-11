const db = require('../config/db');

async function bookSeats(showId, seatNumbers, userId = null) {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // Lock required seats
    const lockQuery = `
      SELECT * FROM seats 
      WHERE show_id = $1 AND seat_number = ANY($2) AND is_booked = false
      FOR UPDATE;
    `;

    const locked = await client.query(lockQuery, [showId, seatNumbers]);

    if (locked.rows.length !== seatNumbers.length) {
      await client.query('ROLLBACK');
      return { success: false, message: "Some seats already booked" };
    }

    // Mark seats booked
    const updateQuery = `
      UPDATE seats SET is_booked = true 
      WHERE show_id = $1 AND seat_number = ANY($2);
    `;
    await client.query(updateQuery, [showId, seatNumbers]);

    // Add booking record
    const bookingInsert = `
      INSERT INTO bookings (show_id, user_id, seats, status)
      VALUES ($1, $2, $3, 'CONFIRMED')
      RETURNING *;
    `;
    const booking = await client.query(bookingInsert, [
      showId,
      userId,
      seatNumbers,
    ]);

    await client.query('COMMIT');

    return { success: true, booking: booking.rows[0] };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Booking error:", err);
    return { success: false, message: "Internal error" };
  } finally {
    client.release();
  }
}

module.exports = {
  bookSeats,
};
