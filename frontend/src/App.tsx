import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShowListPage from "./pages/ShowListPage";
import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 15 }}>Shows</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ShowListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
    </div>
  );
}
