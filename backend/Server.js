const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://csundar993:S1RjXYDtC73UGJCE@cluster2.3g8fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2');

app.get('/api/entries', async (req, res) => {
  const entries = await Entry.find().sort({ date: -1 });
  res.json(entries);
});

app.post('/api/entry', async (req, res) => {
  const { content } = req.body;
  const date = new Date().toISOString().split('T')[0];

  const existing = await Entry.findOne({ date });
  if (existing) return res.status(400).json({ error: 'Entry already exists for today' });
  const entry = new Entry({ date, content });
  await entry.save();
  res.json(entry);
});

app.listen(5000, () => console.log('Server running on port 5000'));
