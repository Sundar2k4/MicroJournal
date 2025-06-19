require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./Models/Entry');
const Tasks = require('./Models/Task');
const Task = require('./Models/Task');
const Goal = require('./Models/Goal');


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));


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

app.post('/task', async (req,res) => {
    try
    {
       const newtask = new Task({
         task:req.body.task
      });

      const saved = await newtask.save();
      res.status(201).json(saved);
    }catch(e)
    {
      console.log(e);
    }

});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
});

app.get('/delete/:id', async (req,res)=>{
   try{
        const {id} = req.params;
        const delet = await Tasks.findByIdAndDelete(id);

        if(delet)
        {
          res.status(201).json('deleted the dish');
        }
   }catch(e)
   {
     res.status(400).json('error occured',e);
   }
})

app.post("/goals", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { goal, due, subtasks } = req.body;

    if (!goal || !Array.isArray(subtasks)) {
      return res.status(400).json({ error: "Goal and subtasks are required" });
    }

    const newGoal = new Goal({
      goal,         
      duedate: due, 
      subtasks,
    });

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    console.error("Error saving goal:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.get('/getgoal',async (req,res)=>{
   try{
      const goals = await Goal.find();
      res.json(goals);
   }catch(e)
   {
     System.out.println(e);
   }
})

app.put("/goals/:goalId/subtask/:subtaskIndex", async (req, res) => {
  try {
    const { goalId, subtaskIndex } = req.params;
    const { iscompleted } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    goal.subtasks[subtaskIndex].iscompleted = iscompleted;
    await goal.save();

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to update subtask: " + err.message });
  }
});



app.listen(port, () => console.log('Server running on port 5000'));
