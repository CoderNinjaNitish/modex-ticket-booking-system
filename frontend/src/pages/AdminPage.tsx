import React, { useState } from "react";
import { API } from "../api";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    type: "MOVIE",
    start_time: "",
    total_seats: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createShow = async () => {
    await API.post("/admin/create-show", {
      name: form.name,
      type: form.type,
      start_time: form.start_time,
      total_seats: Number(form.total_seats),
    });

    alert("Show created!");
  };

  return (
    <div>
      <h2>Create Show</h2>
      <input placeholder="Name" name="name" onChange={handleChange} /><br />
      <select name="type" onChange={handleChange}>
        <option value="MOVIE">MOVIE</option>
        <option value="BUS">BUS</option>
        <option value="DOCTOR">DOCTOR</option>
      </select><br />
      <input type="datetime-local" name="start_time" onChange={handleChange} /><br />
      <input placeholder="Total Seats" name="total_seats" onChange={handleChange} /><br />
      <button onClick={createShow}>Create</button>
    </div>
  );
}
