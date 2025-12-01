require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Checkpoint Schema
const checkpointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for geospatial queries
checkpointSchema.index({ location: '2dsphere' });

const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);

// Routes
app.get('/api/checkpoints', async (req, res) => {
  try {
    const checkpoints = await Checkpoint.find();
    res.json(checkpoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/checkpoints', async (req, res) => {
  const { name, description, latitude, longitude } = req.body;
  
  const checkpoint = new Checkpoint({
    name,
    description,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude] // GeoJSON uses [longitude, latitude]
    }
  });

  try {
    const newCheckpoint = await checkpoint.save();
    res.status(201).json(newCheckpoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di GIS App API',
    endpoints: {
      getAllCheckpoints: 'GET /api/checkpoints',
      getCheckpoint: 'GET /api/checkpoints/:id',
      createCheckpoint: 'POST /api/checkpoints',
      updateCheckpoint: 'PUT /api/checkpoints/:id',
      deleteCheckpoint: 'DELETE /api/checkpoints/:id'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});
