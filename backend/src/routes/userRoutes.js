const express = require('express');
const router = express.Router();

const { getAllShows, getSeatsByShowId } = require('../services/showService');
const { bookSeats } = require('../services/bookingService');

// Get all shows
router.get('/shows', async (req, res) => {
  try {
    const shows = await getAllShows();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: "Failed to get shows" });
  }
});

// Get seats for a specific show
router.get('/shows/:id/seats', async (req, res) => {
  try {
    const seats = await getSeatsByShowId(req.params.id);
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: "Failed to get seats" });
  }
});

// Book seats
router.post('/book', async (req, res) => {
  const { show_id, seats, user_id } = req.body;

  const result = await bookSeats(show_id, seats, user_id);

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.json(result);
});

module.exports = router;
