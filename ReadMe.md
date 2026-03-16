📝 Full Stack Todo App (MERN)

A full stack Todo Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This app allows users to register, login, and manage their personal todos with full CRUD functionality.

🚀 Features

🔐 User Authentication (Register / Login with JWT)

➕ Add new todo

📋 View all todos

✏️ Edit / Update todo

❌ Delete todo

✅ Mark todo as completed

🔒 Protected routes with authentication

🌐 RESTful API

📱 Responsive UI

🛠️ Tech Stack
Frontend

⚛️ React.js

🎨 CSS / Tailwind CSS

🔗 Axios

🔔 React Toastify

🌍 React Router

Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB

🗂️ Mongoose

🔑 JSON Web Token (JWT)

🔐 Bcrypt

📂 Project Structure
todo-app
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── todoController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── userModel.js
│   │   └── todoModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context
│   │   │   └── TodoContext.jsx
│   │   └── App.jsx
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/todo-app.git
2️⃣ Install backend dependencies
cd server
npm install
3️⃣ Install frontend dependencies
cd client
npm install
4️⃣ Environment Variables

PORT=4000
MONGO_URI="mongodb://localhost:27017/"
JWT_SECRET="rizwan12345"


5️⃣ Run the application

Start backend:

npm run server

Start frontend:

npm run dev

📌 Future Improvements

⏰ Todo deadlines

📅 Calendar integration

🔔 Notifications

📊 Todo analytics

👨‍💻 Author

Rizwan Ahmed

MERN Stack Developer

Skilled in React, Node.js, MongoDB, Express