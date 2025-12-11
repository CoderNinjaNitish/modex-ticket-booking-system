
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/bookings', bookingRoutes);

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// import admin routes
const adminRoutes = require('./routes/adminRoutes');

// use admin routes
app.use('/admin', adminRoutes);

// health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

