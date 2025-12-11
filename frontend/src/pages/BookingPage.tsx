import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useParams } from "react-router-dom";
import SeatGrid from "../components/SeatGrid";

export default function BookingPage() {
  const { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    API.get(`/api/shows/${id}/seats`).then((res) => {
      setSeats(res.data);
    });
  }, [id]);

  const toggleSeat = (num: number) => {
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== num));
    } else {
      setSelectedSeats([...selectedSeats, num]);
    }
  };

  const bookNow = async () => {
    const res = await API.post("/api/book", {
      show_id: id,
      seats: selectedSeats,
      user_id: "dummy-user",
    });
    alert(res.data.success ? "Booking successful!" : "Booking failed");
  };

  return (
    <div>
      <h2>Select Seats</h2>
      <SeatGrid seats={seats} selected={selectedSeats} toggle={toggleSeat} />
      <button onClick={bookNow} style={{ marginTop: 20 }}>
        Book Now
      </button>
    </div>
  );
}
