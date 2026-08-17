# 🎯 Smart Job Placement & Recruitment Management System

A full-stack web application designed to simplify and manage the complete campus placement and recruitment process. The system provides separate functionalities for students, recruiters, and administrators to manage job opportunities, applications, recruitment activities, and placement records.

## 🌐 Live Demo

* **Frontend:** https://smart-job-placement-system.vercel.app
* **Backend API:** https://smart-job-placement-api.onrender.com
* **GitHub Repository:** https://github.com/Lanashree07/SmartJobPlacementSystem

## 📌 Overview

The **Smart Job Placement & Recruitment Management System** is built using React.js and Node.js to provide a centralized platform for managing placement activities.

It helps students discover suitable job opportunities, apply for positions, and track their applications while enabling recruiters and administrators to manage recruitment-related activities efficiently.

## ✨ Key Features

* 👨‍🎓 Student registration and profile management
* 💼 Job listing and opportunity management
* 📝 Online job application
* 📊 Application status tracking
* 🏢 Recruiter and company management
* 👨‍💼 Admin dashboard
* 🔍 Job search and filtering
* 📋 Placement and recruitment management
* 🔐 User authentication
* 📱 Responsive user interface

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API

### Database

* SQLite

### Tools

* Git
* GitHub
* Visual Studio Code
* npm

## 📂 Project Structure

```text
SmartJobPlacementSystem/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
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
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Lanashree07/SmartJobPlacementSystem.git
cd SmartJobPlacementSystem
```

### 2. Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 3. Start the Backend

```bash
cd server
npm start
```

### 4. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will be available through the Vite development server.

## 🔌 API Endpoints

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/jobs`             | Retrieve available jobs   |
| POST   | `/api/jobs`             | Add a new job             |
| GET    | `/api/applications`     | Retrieve applications     |
| POST   | `/api/applications`     | Submit an application     |
| PUT    | `/api/applications/:id` | Update application status |
| DELETE | `/api/jobs/:id`         | Delete a job              |

## 🧩 Main Modules

### 👨‍🎓 Student Module

* Student registration
* Profile management
* Browse job opportunities
* Apply for jobs
* Track application status

### 🏢 Recruiter Module

* Manage company information
* Create job postings
* View applications
* Update recruitment status

### 👨‍💼 Admin Module

* Manage students and recruiters
* Manage job postings
* Monitor applications
* Manage placement records

## 🔄 Application Workflow

```text
Student Registration
        ↓
Create Profile
        ↓
Browse Job Opportunities
        ↓
Apply for Job
        ↓
Application Review
        ↓
Selection / Rejection
        ↓
Placement Record
```

## 🚀 Future Enhancements

* AI-based job recommendations
* Resume parsing and analysis
* Skill-based job matching
* Automated interview scheduling
* Email notifications
* Advanced analytics dashboard
* Role-based authentication
* Cloud database integration

## 👩‍💻 Author

**Lana Shree Ganesan**

* GitHub: https://github.com/Lanashree07
* LinkedIn: https://linkedin.com/in/lana-shree-ganesan

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.
