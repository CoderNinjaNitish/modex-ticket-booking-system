# 🎟️ MODEX Ticket Booking System  
A full-stack ticket/slot booking platform built as part of the **MODEX Assessment**.  
The system includes Admin show creation, seat generation, user show browsing, seat booking, and concurrency-safe backend logic.

---

## 🔧 Tech Stack

### **Backend**
- Node.js + Express
- PostgreSQL (Supabase)
- pg (PostgreSQL client)
- Row-level locking (`SELECT ... FOR UPDATE`)
- Clean folder structure (routes, controllers, services)

### **Frontend**
- React + TypeScript (Vite)
- React Router DOM
- Axios
- Context API (can be extended)
- Seat selection grid UI

### **Deployment**
- Backend → Render  
- Frontend → Vercel  
- Database → Supabase (PostgreSQL hosted)

---

## 📁 Project Structure

MODEX_Project/
│
├── backend/
│ ├── src/
│ │ ├── config/db.js
│ │ ├── controllers/adminController.js
│ │ ├── routes/adminRoutes.js
│ │ ├── routes/userRoutes.js
│ │ ├── routes/bookingRoutes.js
│ │ ├── services/showService.js
│ │ ├── services/bookingService.js
│ │ ├── utils/errorHandler.js
│ │ ├── server.js
│ │ └── testDb.js (optional)
│ ├── .env.example
│ ├── package.json
│ └── README.md
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── AdminPage.tsx
│ │ │ ├── ShowListPage.tsx
│ │ │ └── BookingPage.tsx
│ │ ├── components/SeatGrid.tsx
│ │ ├── api.ts
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── package.json
│ └── index.html
│
├── docs/
│ ├── system_design.md
│ └── deployment.md
│
└── MODEX_Backend.postman_collection.json

yaml
Copy code

---

# 🚀 Features

### ⭐ **Admin**
- Create shows/trips (name, type, start time, seats)
- Auto-generate seats (1…N)
- View all shows

### ⭐ **User**
- View all shows
- View available seats
- Select multiple seats
- Book seats with real-time API

### ⭐ **Backend Logic**
- Uses **PostgreSQL row-level locks** to prevent double booking
- Atomic booking using **database transactions**
- Clean service-layer architecture
- Optional: booking expiry logic (pending → failed)

### ⭐ **Frontend UI**
- Simple and clean React+TS interface
- Seat grid visualization
- Highlight selected seats
- Error handling for already booked seats

---

# 🛠️ API Endpoints

### **Admin**
#### POST `/admin/create-show`
Create a new show.

#### GET `/admin`
Test route.

---

### **User**
#### GET `/api/shows`
Fetch all shows.

#### GET `/api/shows/:id/seats`
Fetch seat layout.

#### POST `/api/book`
Book one or more seats.

Request body:
```json
{
  "show_id": "uuid",
  "seats": [1, 2, 3],
  "user_id": "any-user-id"
}
🧪 Postman Collection
A ready-to-use Postman collection is included:

pgsql
Copy code
MODEX_Backend.postman_collection.json
Import into Postman → Set {{BASE_URL}} to deployed backend URL.

🛢️ Database Schema (Supabase)
shows
Column	Type
id	uuid (pk)
name	text
type	text
start_time	timestamp
total_seats	int
created_at	timestamp

seats
Column	Type
id	uuid (pk)
show_id	uuid (fk)
seat_number	int
is_booked	boolean

bookings
Column	Type
id	uuid (pk)
show_id	uuid (fk)
user_id	uuid
seats	int[]
status	text

🔐 Concurrency Control (Why no double-booking?)
This system uses:

✔ SQL row-level locks
pgsql
Copy code
SELECT * FROM seats
WHERE show_id = $1 AND seat_number = ANY($2)
FOR UPDATE;
✔ Transactional booking
Lock seats

Check if all free

Update seat status

Insert booking

Commit

If anything fails → rollback.
This ensures no two users ever book the same seat.

🌐 Deployment (Required for MODEX Submission)
Backend (Render)
Build: npm install

Start: npm start

Root Directory: backend

Env Vars:

ini
Copy code
DATABASE_URL=
PORT=3000
Frontend (Vercel)
Root: frontend

Build: npm run build

Output: dist

Env Vars:

ini
Copy code
VITE_API_URL = https://<backend-url>
🎥 Video Requirements (MODEX)
Your video must include:

1. Deployment explanation (step-by-step)
2. Frontend + backend demo
3. Architecture explanation
4. Seat booking demo
5. What makes your solution unique
A script is included in docs.

📌 Final Deliverables
🔗 Backend URL (Render)
To be added after deployment

🔗 Frontend URL (Vercel)
To be added after deployment

🔗 GitHub Repo
https://github.com/CoderNinjaNitish/modex-ticket-booking-system

🎥 Video Link
To be added after recording

✔ Status
✅ Backend Complete
✅ Frontend Complete
✅ Docs Complete
⬜ Backend Deployment
⬜ Frontend Deployment
⬜ Video Recording

🙌 Author
Nitish Kumar
Full-stack Developer | B.Tech CSE

yaml
Copy code

---

# Want it even shorter or more fancy?
I can generate:

➡️ Minimal README  
➡️ Premium README with badges  
➡️ Dark theme ASCII header  
➡️ Separate backend/frontend README  

Just tell me: **short**, **premium**, or **separate**.






