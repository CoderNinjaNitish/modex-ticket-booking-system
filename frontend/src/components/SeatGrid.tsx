import React from "react";

export default function SeatGrid({ seats, selected, toggle }: any) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 40px)", gap: 8 }}>
      {seats.map((seat: any) => {
        const isSelected = selected.includes(seat.seat_number);
        return (
          <div
            key={seat.id}
            onClick={() => !seat.is_booked && toggle(seat.seat_number)}
            style={{
              width: 40,
              height: 40,
              background: seat.is_booked
                ? "grey"
                : isSelected
                ? "green"
                : "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: seat.is_booked ? "not-allowed" : "pointer",
            }}
          >
            {seat.seat_number}
          </div>
        );
      })}
    </div>
  );
}
