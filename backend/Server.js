const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://csundar993:S1RjXYDtC73UGJCE@cluster2.3g8fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2');

app.get('/entries', async (req, res) => {
  const entries = await Entry.find().sort({ date: -1 });
  res.json(entries);
});

app.post('/entry', async (req, res) => {
  const { content } = req.body;
  const date = new Date().toISOString().split('T')[0];

  const existing = await Entry.findOne({ date });
  if (existing) return res.status(400).json({ error: 'Entry already exists for today' });
  const entry = new Entry({ date, content });
  await entry.save();
  res.json(entry);
});


app.get('/streak', async (req, res) => {
  const entries = await Entry.find({}, 'date').sort({ date: -1 });
  const entryDates = new Set(entries.map(e => e.date));

  let streak = 0;
  let current = new Date();

  while (true) {
    const dateStr = current.toISOString().split('T')[0];

    if (entryDates.has(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  res.json({ streak });
});

app.listen(5000, () => console.log('Server running on port 5000'));
