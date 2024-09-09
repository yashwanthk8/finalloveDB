const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB (without deprecated options)
mongoose.connect('mongodb://localhost:27017/loveCalculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const loveSchema = new mongoose.Schema({
  sname: String,
  fname: String,
});

const Love = mongoose.model('Love', loveSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save names
app.post('/save-names', async (req, res) => {
  try {
    const { sname, fname } = req.body;
    const newLove = new Love({ sname, fname });
    await newLove.save();
    res.status(201).json({ message: 'Names saved successfully!' });
  } catch (error) {
    console.error('Error saving names:', error);
    res.status(500).json({ error: 'Failed to save names' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
