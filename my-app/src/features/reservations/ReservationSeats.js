import styles from './ReservationSeats.module.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSeatsAsync,
    selectAllSeats,
    selectHallHeight,
    selectHallWidth,
    selectSelectedSeatIds,
    selectSeat,
    unselectSeat,
} from '../seats/seatsSlice';

export default function ReservationSeats() {
    const dispatch = useDispatch();
    const allSeats = useSelector(selectAllSeats);
    const selectedSeatIds = useSelector(selectSelectedSeatIds);
    const hallWidth = useSelector(selectHallWidth);
    const hallHeight = useSelector(selectHallHeight);

    useEffect(() => {
        dispatch(getSeatsAsync());
    }, []);

    function isSeatSelected(seatId) {
        return (selectedSeatIds.indexOf(seatId) != -1);
    }

    function toggleSeatSelection(x, y) {
        let targetSeat = allSeats.find((seat) => seat.cords.x === x && seat.cords.y === y);
        
        if (targetSeat === null || targetSeat.reserved) {
            return;
        }

        if (isSeatSelected(targetSeat.id)) {
            dispatch(unselectSeat(targetSeat.id));
        }
        else {
            dispatch(selectSeat(targetSeat.id));
        }
    }

    return (
        <div className={styles.hallGrid} style={{
            gridTemplateColumns: `repeat(${hallHeight}, 1fr)`,
            gridTemplateRows: `repeat(${hallWidth}, 1fr)`
        }}>
            {allSeats.map((seat) => {
                return <div
                    key={seat.id}
                    className={seat.reserved ? styles.reservedSeat : isSeatSelected(seat.id) ? styles.selectedSeat : styles.seat}
                    style={{ gridArea: `${seat.cords.x + 1} / ${seat.cords.y + 1}` }}
                    onClick={() => toggleSeatSelection(seat.cords.x, seat.cords.y)}
                ></div>;
            })}
        </div>
    );
}