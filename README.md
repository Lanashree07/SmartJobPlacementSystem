# 🚀 Smart Job Placement & Recruitment Management System

A full-stack web application built with React, Vite, Node.js, Express, and SQLite for managing candidates, job opportunities, interviews, and successful placements through a centralized recruitment dashboard.

---

## 🌐 Live Project

### 🔗 Live Application
https://smart-job-placement-system.vercel.app

### 🔗 Backend API
https://smart-job-placement-api.onrender.com

### 🔗 GitHub Repository
https://github.com/Lanashree07/SmartJobPlacementSystem

---

## 📌 Project Overview

The **Smart Job Placement & Recruitment Management System** is a full-stack recruitment management application designed to simplify the process of managing candidates, job openings, interviews, and successful placements.

The system provides a centralized dashboard where recruitment information can be viewed and updated manually through an interactive web interface.

The frontend is developed using **React + Vite**, while the backend is powered by **Node.js + Express** with **SQLite** for data storage.

---

## ✨ Features

- 📊 Recruitment dashboard
- 👨‍💼 Candidate management
- 💼 Job opportunity management
- 🎯 Placement management
- 📝 Manual candidate entry
- 📝 Manual job entry
- 📝 Manual placement entry
- 📈 Candidate score tracking
- 🔖 Candidate application status tracking
- 🗓️ Interview information
- 👥 Applicant count tracking
- 💰 Salary and joining-date tracking
- 💾 SQLite database storage
- 🔗 REST API integration
- 📱 Responsive dashboard interface
- 🌐 Production deployment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Database

- SQLite
- Better-SQLite3

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

### Deployment

- Vercel – Frontend
- Render – Backend

---

## 📂 Project Structure

SmartJobPlacementSystem/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

---

### ⚙️ Getting Started

1. Clone the Repository

git clone https://github.com/Lanashree07/SmartJobPlacementSystem.git

Move into the project directory:

cd SmartJobPlacementSystem

---

### 🖥️ Backend Setup

Move into the server directory:

cd server

Install the backend dependencies:

npm install

Start the backend server:

npm start

The backend will run at:

http://localhost:5001

The API base URL is:

http://localhost:5001/api

---

### 💻 Frontend Setup

Open a new terminal.

Move into the client directory:

cd client

Install frontend dependencies:

npm install

Start the React development server:

npm run dev

The frontend will run at:

http://localhost:5173

---

### 📡 API Endpoints

### Overview

GET /api/overview

Returns dashboard statistics such as:

Total candidates
Interviews scheduled
Active jobs
Placements
Placement rate

---

### Candidates

Get all candidates:

GET /api/candidates

Add a candidate:

POST /api/candidates

Update a candidate:

PUT /api/candidates/:id

Delete a candidate:

DELETE /api/candidates/:id

---

### Jobs

Get all jobs:

GET /api/jobs

Add a job:

POST /api/jobs

---

### Placements

Get all placements:

GET /api/placements

Add a placement:

POST /api/placements

---

### 👨‍💼 Candidate Management

The Candidate Pipeline allows users to manually enter and manage candidate information.

Candidate Details

Full Name
Role
Email
Experience
Candidate Score
Application Status

Available Statuses

Applied
Shortlisted
Interviewing
Offered

---

### 💼 Job Management

The Open Positions section allows users to manually add job opportunities.

Job Details

Job Title
Company
Location
Employment Type
Number of Applicants
Filled/Open Status

---

### 🎯 Placement Management

The Successful Placements section allows users to manually record candidates who have been placed.

Placement Details

Candidate Name
Role
Company
Salary
Start Date

---

### 📊 Dashboard

The dashboard provides an overview of recruitment activity.

Dashboard Statistics

Total Candidates
Interviews Scheduled
Active Jobs
Placements
Placement Rate

The dashboard also displays:

Candidate Pipeline
Open Positions
Successful Placements

---

### 🔄 Application Architecture

                    ┌────────────────────────────┐
                    │          Vercel            │
                    │                            │
                    │     React + Vite           │
                    │       Frontend             │
                    └─────────────┬──────────────┘
                                  │
                                  │ REST API
                                  ▼
                    ┌────────────────────────────┐
                    │          Render            │
                    │                            │
                    │    Node.js + Express       │
                    │        Backend             │
                    └─────────────┬──────────────┘
                                  │
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │          SQLite            │
                    │         Database            │
                    └────────────────────────────┘

---                    

### 🌐 Deployment

Frontend Deployment

The React + Vite frontend is deployed using Vercel.

Live application:

https://smart-job-placement-system.vercel.app

Backend Deployment

The Node.js + Express backend is deployed using Render.

Backend API:

https://smart-job-placement-api.onrender.com

---

### 🔗 Important Links

Resource	Link

🌐 Live Application	https://smart-job-placement-system.vercel.app

⚙️ Backend API	https://smart-job-placement-api.onrender.com

💻 GitHub Repository	https://github.com/Lanashree07/SmartJobPlacementSystem

👩‍💻 GitHub Profile	https://github.com/Lanashree07

💼 LinkedIn Profile	https://www.linkedin.com/in/lana-shree-ganesan/

---

### 📋 Example Workflow

1. Open the Smart Job Placement System

              ↓

2. View the recruitment dashboard

              ↓

3. Add candidate details

              ↓

4. Track candidate status and score

              ↓

5. Add available job opportunities

              ↓

6. Track applicants

              ↓

7. Add successful placement details

              ↓

8. View placement information

---

### 🔐 Data Management

The backend uses SQLite with Better-SQLite3 to store:

Candidates
Jobs
Placements

The Express server exposes REST API endpoints that allow the React frontend to communicate with the database.

---

### 📱 Responsive Design

The application includes a responsive dashboard layout that adapts to different screen sizes.

It supports:

Desktop screens
Laptop screens
Tablet screens
Mobile-sized screens

---

### 🚀 Production URLs

Frontend

https://smart-job-placement-system.vercel.app

Backend

https://smart-job-placement-api.onrender.com

---

### 👩‍💻 Author

Lana Shree Ganesan

GitHub

https://github.com/Lanashree07

LinkedIn

https://www.linkedin.com/in/lana-shree-ganesan/

---

### ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is created for educational and portfolio purposes.