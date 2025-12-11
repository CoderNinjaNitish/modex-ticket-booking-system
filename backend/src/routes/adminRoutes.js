const express = require('express');
const router = express.Router();

const { createShow } = require('../controllers/adminController');

// temp test route
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes working' });
});

// create show
router.post('/create-show', createShow);

module.exports = router;
