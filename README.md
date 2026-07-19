# AussieFit Aggregator — Module 7: User Dashboard

TaskFlow is a production-grade, containerized user analytics dashboard designed as part of the **Australian Fitness Aggregator Platform** assessment [1.1, 1.2]. It showcases secure JWT user authentication, dynamic data metrics, check-in history logs, upcoming class schedules, weekly interactive SVG charts, and responsive Dark Mode styles [1.1, 1.2].

---

## 🔗 Production Deployments

*   **Frontend Client (Vercel):** `https://aussiefit-dashboard.vercel.app` *(Replace with your Vercel URL)*
*   **Backend Server (Vercel):** `https://aussiefit-backend.vercel.app` *(Replace with your Vercel API URL)*

---

## 🛠️ Stack & Dependency Structure

*   **Frontend:** React (Vite), Redux Toolkit, Tailwind CSS, Axios, CSS-driven SVG charts
*   **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose ORM, JWT, Bcryptjs
*   **Deployment & Ops:** Docker, Docker Compose, Nginx

---

## ⚙️ Initial Setup & Local Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Server running locally on port `27017` **OR** Docker Desktop installed.

---

### Method A: Running with Docker Compose (Recommended)
This runs the complete full-stack project, including database instances, in structured containers with a single command:

1. Open your terminal in the root folder of your project (`aussiefit-platform`).
2. Run the Docker composition command:
   ```bash
   docker-compose up --build