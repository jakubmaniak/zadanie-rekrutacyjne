import styles from './ReservationSeats.module.css'

import { useEffect, useState } from 'react';

export default function ReservationSeats() {
    const [seats, setSeats] = useState([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/seats')
        .then((response) => response.json())
        .then((seats) => {
            setSeats(seats);
            setWidth(getHallWidth(seats));
            setHeight(getHallHeight(seats));
        });
    }, []);

    function getHallWidth(seats) {
        let xs = new Set(seats.map((seat) => seat.cords.x));
        return Math.max(...xs) + 1;
    }

    function getHallHeight(seats) {
        let ys = new Set(seats.map((seat) => seat.cords.y));
        return Math.max(...ys) + 1;
    }

    function isSeatSelected(seatIndex) {
        return (selectedSeats.indexOf(seats[seatIndex]) != -1);
    }

    function toggleSeatSelection(x, y) {
        let seatIndex = seats.findIndex((seat) => seat.cords.x === x && seat.cords.y === y);
        
        if (seatIndex == -1 || seats[seatIndex].reserved) {
            return;
        }

        if (isSeatSelected(seatIndex)) {
            unselectSeat(seatIndex);
        }
        else {
            selectSeat(seatIndex);
        }
    }

    function selectSeat(seatIndex) {
        setSelectedSeats((selectedSeats) => [...selectedSeats, seats[seatIndex]]);
    }

    function unselectSeat(seatIndex) {
        let newSeats = [...selectedSeats];
        newSeats.splice(selectedSeats.indexOf(seats[seatIndex]), 1);

        setSelectedSeats(newSeats);
    }

    return (
        <div className={styles.hallGrid} style={{
            gridTemplateColumns: `repeat(${height}, 1fr)`,
            gridTemplateRows: `repeat(${width}, 1fr)`
        }}>
            {seats.map((seat, seatIndex) => {
                return <div
                    key={seat.id}
                    className={seat.reserved ? styles.reservedSeat : isSeatSelected(seatIndex) ? styles.selectedSeat : styles.seat}
                    style={{ gridArea: `${seat.cords.x + 1} / ${seat.cords.y + 1}` }}
                    onClick={() => toggleSeatSelection(seat.cords.x, seat.cords.y)}
                ></div>;
            })}
        </div>
    );
}