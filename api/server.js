// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Test MongoDB Connection
app.get('/api/test-db-connection', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  
  if (dbStatus === 1) {
    // 1 means connected
    res.json({ message: "MongoDB is connected successfully!" });
  } else {
    res.json({ message: "MongoDB connection failed!" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
