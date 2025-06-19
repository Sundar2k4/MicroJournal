````markdown
# 🧠 Personal MultiPlanner 🗓️

A full-stack **MERN** application that helps you stay organized, productive, and self-aware.  
This **MultiPlanner** includes:

- ✍️ MicroJournal — for daily one-line reflections
- ✅ Task Manager — to keep track of your todos
- ⏱️ Productivity Timer — to stay focused (Pomodoro-style)
- 🎯 Goal Manager — to break goals into subtasks and track progress visually

---

## 🚀 Features

- **MicroJournal:**  
  Log one-liner entries each day. Tracks your writing streak automatically.

- **Task Manager:**  
  Add, delete, and manage tasks. Stay on top of your priorities.

- **Productivity Timer:**  
  A simple focus timer to help you work in sprints.

- **Goal Tracker:**  
  Create long-term goals and break them down into subtasks.  
  Subtasks are markable via radio buttons. Progress is visualized as a percentage.  
  Completed subtasks are automatically greyed out.

---

## 🛠️ Tech Stack

**Frontend**

- React.js
- TailwindCSS
- React Router DOM

**Backend**

- Node.js
- Express.js
- MongoDB (via Mongoose)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/multiplanner.git
cd multiplanner
```
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder with the following:

```env
PORT=5000
MONGO_URL=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/multiplanner?retryWrites=true&w=majority
```

Then start the backend:

```bash
node server.js
# or
npx nodemon server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 Folder Structure

```
multiplanner/
├── backend/
│   ├── models/
│   │   ├── Entry.js
│   │   ├── Goal.js
│   │   ├── Task.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── components/
    │   ├── GoalTracker.jsx
    │   ├── GoalForm.jsx
    │   ├── Journal.jsx
    │   ├── TaskManager.jsx
    │   └── ProductivityTimer.jsx
    ├── App.jsx
    └── main.jsx
```

---

## ✨ Future Ideas

- 📊 Progress charts
- 🛎️ Notifications/reminders
- 🔒 Authentication (Login/Signup)
- 📱 Mobile responsiveness

---

## 🧑‍💻 Author

Made with ❤️ by **Sundar C**

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).

```

```
