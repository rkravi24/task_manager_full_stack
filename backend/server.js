require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('./middleware/session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

//Connect to MongoDB
connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(session);

//Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true               
}));

//Routes
app.use('/auth', authRoutes);

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


