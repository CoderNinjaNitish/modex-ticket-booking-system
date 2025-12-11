import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom";

export default function ShowListPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    API.get("/api/shows").then((res) => {
      setShows(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Available Shows</h2>
      {shows.map((s: any) => (
        <div key={s.id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
          <h3>{s.name}</h3>
          <p>Type: {s.type}</p>
          <p>Time: {new Date(s.start_time).toLocaleString()}</p>
          <Link to={`/booking/${s.id}`}>Book Now</Link>
        </div>
      ))}
    </div>
  );
}
