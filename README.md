# AussieFit Aggregator — Module 7: User Dashboard

TaskFlow is a production-grade, containerized user analytics dashboard designed as part of the **Australian Fitness Aggregator Platform** assessment. It features secure JWT user authentication, dynamic data metrics, check-in history logs, upcoming class schedules, weekly interactive SVG charts, keyless Google Maps frames, and responsive Dark Mode styles.

---

## Production Deployments

*   **Frontend Client (Vercel):** `https://australian-fitness-iv8c.vercel.app/`
*   **Backend Server (Vercel):** `https://australian-fitness.vercel.app/`

## Demo Video - Google drive Link

*   **Demo Video :** `https://drive.google.com/file/d/1x6a1MpuEk-xWNaAMsDh4ncsOPgt5CJQF/view?usp=drive_link`

---

## Tech Stack

*   **Frontend:** React (Vite compiler), Redux Toolkit, Tailwind CSS, Axios, custom SVG curved area analytics charts
*   **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose ORM, JSON Web Tokens (JWT), Bcryptjs
*   **Containerization & Ops:** Docker, Docker Compose, Nginx

---

## Features Implemented

### Core Requirements (Module 7)
*   **Membership Card:** Displays active plan tier, status badge, and calculated remaining validity on a custom progress bar.
*   **Visits Log:** Lists user check-in history with real-world timestamps, paired with a simulation widget to perform instant check-ins.
*   **Upcoming Classes:** Displays scheduled fitness sessions with instructor information, paired with an instant booking widget.
*   **Favorite Gym:** Features a quick-access location indicator at the top banner.
*   **Weekly Activity:** Aggregates and displays weekly check-in trends.

### Bonus Features Included
*   **Responsive UI:** Fully optimized layout across mobile, tablet, and desktop viewports.
*   **Dark Mode Toggle:** Persistent light/dark switching utilizing React state and browser `localStorage`.
*   **Interactive Google Map:** Embedded map in the sidebar showcasing the location of the user's favorite gym.
*   **QR Scanner Simulation:** Interactive scan modal rendering a scanning radar frame with bouncing laser animations to register virtual passes.
*   **Visual Data Charts:** Smooth custom SVG Curved Area Chart drawing Cubic Bezier lines dynamically based on real database records.
*   **Dockerization:** Multi-stage Dockerfiles and composition configurations for local database clustering.

---

## Directory Structure

```text
aussiefit-platform/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Route controllers (Auth and Dashboard logic)
│   ├── middleware/         # Session validation & error handlers
│   ├── models/             # Mongoose relational schemas (User, Visit, Booking)
│   ├── routes/             # Express routing configurations
│   ├── .env                # Local private environmental keys
│   ├── Dockerfile          # Multi-stage backend container configuration
│   ├── package.json        # Backend server dependencies
│   ├── server.js           # API entry point & serverless exporter
│   └── vercel.json         # Vercel backend configuration
├── frontend/
│   ├── src/
│   │   ├── api/            # Configured Axios instance with interceptors
│   │   ├── components/     # Reusable layout elements (Navbar, ProtectedRoute)
│   │   ├── pages/          # Primary views (Dashboard, Home, Login, Register)
│   │   ├── store/          # Redux Store and Auth Slice
│   │   ├── App.jsx         # Client Router and global contexts
│   │   ├── index.css       # Tailwind utility directives and theme layers
│   │   └── main.jsx        # DOM mounting point
│   ├── Dockerfile          # Nginx compiled production static host container
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend React/Vite dependencies
│   ├── postcss.config.js   # Style compiler configurations
│   ├── tailwind.config.js  # Utility configuration files
│   └── vercel.json         # SPA single-page routing rewrite rules
├── docker-compose.yml      # Local multi-container development orchestrator
├── .gitignore              # Environment and module ignoring specifications
└── README.md               # Documentation landing page

API Documentation:

All API requests and responses are formatted as JSON payloads. Authentication is
verified through bearer tokens injected into the Authorization header.

Authentication Routes

| Method   | Endpoint             | Description                                             | Auth Required          |
| :------- | :------------------- | :------------------------------------------------------ | :--------------------- |
| **POST** | `/api/auth/register` | Creates a new user profile and returns a session token. | No                     |
| **POST** | `/api/auth/login`    | Validates credentials and returns a session token.      | No                     |
| **GET**  | `/api/auth/me`       | Fetches details of the currently authenticated profile. | **Yes** (Bearer Token) |


User Dashboard Routes:

🟢 GET /api/dashboard/stats

  - Description: Computes active plan status, remaining days, upcoming classes,
    recent check-ins, and weekly progress statistics.
  - Authorization: Required (Bearer Token)

🔵 POST /api/dashboard/checkin

  - Description: Registers a gym check-in, creating a database visit record.
  - Authorization: Required (Bearer Token)

🔵 POST /api/dashboard/booking

  - Description: Books an upcoming group fitness class, creating a database
    booking record.
  - Authorization: Required (Bearer Token)



Local Installation & Setup:

Option A: Running with Docker Compose (Recommended)

This runs the complete database-connected full-stack project locally using
containerized images:

1.  Open your terminal in the root folder of your project:
    docker-compose up --build
2.  Open your browser and navigate to http://localhost:5173 to interact with the
    application.

Option B: Native Local Development

1. Backend API Setup

1.  Navigate to the backend directory:
    cd backend
2.  Install server-side dependencies:
    npm install
3.  Create a .env file inside /backend with these local environment values:
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/task_manager?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
4.  Start the server (nodemon will watch for changes):
    npm run dev

2. Frontend Client Setup

1.  Open a new terminal window and navigate to the frontend directory:
    cd frontend
2.  Install client-side dependencies:
    npm install
3.  Create a .env file inside /frontend with this local API variable:
    VITE_API_URL=http://localhost:5000/api
4.  Start the local Vite developer preview:
    npm run dev
5.  Open your browser and navigate to http://localhost:5173 to test the
    application locally.

