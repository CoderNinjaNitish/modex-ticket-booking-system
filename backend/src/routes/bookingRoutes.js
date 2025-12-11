const express = require('express');
const router = express.Router();

const { bookSeats } = require('../services/bookingService');

// Book seats route
router.post('/book', async (req, res) => {
  try {
    const { show_id, seats, user_id } = req.body;

    if (!show_id || !seats) {
      return res.status(400).json({ error: "show_id and seats are required" });
    }

    const result = await bookSeats(show_id, seats, user_id);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(201).json(result);
  } catch (err) {
    console.error("bookingRoutes error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
