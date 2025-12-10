# 🎓 Student Management System (Node.js + Express + MongoDB + Handlebars)

A **full-stack server-side rendered CRUD web application** built using **Node.js, Express, MongoDB, Mongoose, and Handlebars (HBS)**.  
This project allows users to **Add, View, Update, and Delete (CRUD)** student records using a clean Bootstrap UI.

---

## ✅ Features

- ➕ Add new students  
- 📋 View all students in a table  
- ✏️ Edit student details  
- 🗑 Delete students  
- 🧩 MVC Architecture  
- ⚡ Async/Await based MongoDB operations  
- 🎨 Bootstrap 5 UI  
- 🛡 Safe routing and data handling  

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|------|------------|
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Templating | Handlebars (HBS) |
| UI | HTML, CSS, Bootstrap 5 |
| Architecture | MVC (Model–View–Controller) |

---

# 🟢 1. OVERALL ARCHITECTURE (BIG DIAGRAM)
┌────────────┐
│ BROWSER │
│ (User UI) │
└─────┬──────┘
│ HTTP Request (GET/POST)
▼
┌────────────┐
│ EXPRESS │ ← index.js
│ SERVER │
└─────┬──────┘
│ Calls Routes
▼
┌────────────┐
│ CONTROLLER │ ← studentController.js
│ (Logic) │
└─────┬──────┘
│ DB Queries via Mongoose
▼
┌────────────┐
│ MONGOOSE │ ← student.model.js
│ (ORM) │
└─────┬──────┘
│ Data Read/Write
▼
┌────────────┐
│ MONGODB │ ← studentsDB
│ (Database)│
└────────────┘

DATA RETURN FLOW:
MongoDB → Controller → Handlebars → HTML → Browser

---

# 🟢 2. FOLDER STRUCTURE DIAGRAM
Node MongoDB/
│
├── index.js
│
├── models/
│ ├── db.js
│ └── student.model.js
│
├── controllers/
│ └── studentController.js
│
├── views/
│ ├── layouts/
│ │ └── MainLayout.hbs
│ │
│ └── student/
│ ├── addOrEdit.hbs
│ └── list.hbs
│
├── .gitignore
├── package.json
└── README.md


---

# 🟢 3. REQUEST–RESPONSE FLOW (FULL LIFECYCLE)

---

## ✅ A) ADD STUDENT FLOW

User → /student (GET)
→ addOrEdit.hbs (Form)

User → Submit Form (POST /student)
→ Controller → insertRecord()
→ Mongoose → MongoDB Save
→ Redirect → /student/list


---

## ✅ B) VIEW STUDENT LIST
User → /student/list (GET)
→ Student.find()
→ MongoDB returns records
→ Handlebars list.hbs
→ HTML Table → Browser


---

## ✅ C) EDIT STUDENT



User → Click Edit
→ /student/:id
→ Student.findById(id)
→ Form pre-filled
→ User edits & submits
→ Student.findByIdAndUpdate()


---

## ✅ D) DELETE STUDENT

User → Click Delete
→ /student/delete/:id
→ Student.findByIdAndDelete()
→ Redirect → /student/list

---

# 🟢 4. DATABASE STRUCTURE (MongoDB Document)

Each student record is stored as:

```json
{
  "_id": "65fc92d1...",
  "fullName": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "mobile": "9876543210",
  "city": "Chennai",
  "createdAt": "2025-02-10T10:23:45Z",
  "updatedAt": "2025-02-10T10:23:45Z"
}
```
studentsDB → students (collection)

🟢 5. HOW EACH FILE WORKS (MICRO-LEVEL)
✅ db.js — DATABASE BOOTSTRAP

Establishes connection with MongoDB

Loads all schemas

Keeps database connection alive

✅ student.model.js — DATA BLUEPRINT

Defines Student schema

Performs schema validation

Registers Student model with Mongoose

✅ studentController.js — APPLICATION BRAIN

Handles all business logic:

Route	Purpose
GET /student	Show insert form
POST /student	Insert / Update
GET /student/list	Read
GET /student/:id	Edit
GET /student/delete/:id	Delete

🟢 5. HOW EACH FILE WORKS (MICRO-LEVEL)
✅ db.js — DATABASE BOOTSTRAP

Establishes connection with MongoDB

Loads all schemas

Keeps database connection alive

✅ student.model.js — DATA BLUEPRINT

Defines Student schema

Performs schema validation

Registers Student model with Mongoose

✅ studentController.js — APPLICATION BRAIN

Handles all business logic:

Route	Purpose
GET /student	Show insert form
POST /student	Insert / Update
GET /student/list	Read
GET /student/:id	Edit
GET /student/delete/:id	Delete

🟢 7. HOW DATA MOVES INTERNALLY (VERY IMPORTANT)

Example: Adding a student

1. Browser sends POST request
2. Express parses body into req.body
3. Controller receives data
4. Mongoose converts JS Object to BSON
5. MongoDB stores data on disk
6. Server sends redirect response
7. Browser loads /student/list
8. New student appears in table

🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/nishanthsanthapuri/student-crud-node-mongo.git
cd student-crud-node-mongo

2️⃣ Install Dependencies
npm install

3️⃣ Start MongoDB
mongod

4️⃣ Run Server
npm start

5️⃣ Open in Browser
http://localhost:3000/student/list

🔐 Security & Stability Features

✅ Async/Await (No callbacks)

✅ ObjectId validation

✅ Safe update queries

✅ MVC architecture

✅ No experimental dependencies

✅ Clean dependency management

📌 Future Improvements

JWT Authentication

Search & Pagination

Input validation (express-validator)

REST API version

React frontend version

Role-based access control


---

# 🌍 Deployment Guide

This project can be deployed on multiple platforms. Below are the **step-by-step deployment instructions** for the most common production environments.

---

## 🚀 Option 1: Deploy on **Render (Recommended for Beginners)**

### ✅ Prerequisites
- GitHub account
- Your project pushed to GitHub
- MongoDB Atlas account (cloud MongoDB)

---

### ✅ Step 1: Create MongoDB Atlas Database
1. Go to https://www.mongodb.com/atlas
2. Create a **Free Cluster**
3. Copy the **connection string**


---
mongodb+srv://<username>:<password>@cluster0.mongodb.net/studentsDB
### ✅ Step 2: Update `models/db.js` for Production
Replace:
```js
mongoose.connect("mongodb://localhost:27017/studentsDB");

```
mongoose.connect(process.env.MONGO_URI);

✅ Step 3: Push Code to GitHub
git add .
git commit -m "Prepare for cloud deployment"
git push

✅ Step 4: Deploy on Render

Go to https://render.com

Click New → Web Service

Connect your GitHub repository

Set:

Build Command: npm install

Start Command: npm start

Add Environment Variable:

Key: MONGO_URI

Value: MongoDB Atlas connection string

Click Deploy

✅ Step 5: Access Live App

Render will give you a URL:

https://your-app-name.onrender.com/student/list

🚆 Option 2: Deploy on Railway
✅ Steps

Go to: https://railway.app

Login with GitHub

Click New Project

Select Deploy from GitHub Repo

Add environment variable:

MONGO_URI → Your Atlas DB URL

Click Deploy

✅ Railway will automatically build and run your app.

🖥 Option 3: Deploy on Linux VPS (DigitalOcean / AWS / Azure)
✅ Step 1: Connect to Server
ssh root@YOUR_SERVER_IP

✅ Step 2: Install Node & MongoDB
sudo apt update
sudo apt install nodejs npm mongo -y

✅ Step 3: Clone Repository
git clone https://github.com/YOUR-USERNAME/student-crud-node-mongo.git
cd student-crud-node-mongo

✅ Step 4: Install Dependencies
npm install

✅ Step 5: Start App Using PM2
npm install -g pm2
pm2 start index.js --name student-app
pm2 save

✅ Step 6: Allow Firewall Port
sudo ufw allow 3000


App will be live at:

http://YOUR_SERVER_IP:3000/student/list

🔐 Environment Variables (Production)

Create a .env file in production:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studentsDB
PORT=3000


Install dotenv:

npm install dotenv


Update index.js:

require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT);

📊 Production Best Practices

✅ Use MongoDB Atlas (cloud DB)

✅ Use PM2 for process management

✅ Use environment variables for secrets

✅ Enable HTTPS

✅ Add request logging (morgan)

✅ Add input validation

✅ Use proper error handling middleware

🧪 Health Check (After Deployment)

Visit:

/student/list


You should see:

✅ App running

✅ MongoDB connected

✅ Full CRUD operations working

🏁 Final Deployment Status
Platform	Supported
Localhost	✅
Render	✅
Railway	✅
VPS Server	✅
MongoDB Atlas	✅
