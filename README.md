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

