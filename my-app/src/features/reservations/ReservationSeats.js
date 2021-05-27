import styles from './ReservationSeats.module.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Skeleton } from 'antd';

import {
    getSeatsAsync,
    selectReservationDetails,
    selectAllSeats,
    selectHallHeight,
    selectHallWidth,
    selectSelectedSeatIds,
    selectFetchingSeats,
    selectSeat,
    unselectSeat
} from '../seats/seatsSlice';
import { navigateTo } from '../navigation/navigationSlice';


export default function ReservationSeats() {
    const dispatch = useDispatch();
    const loading = useSelector(selectFetchingSeats);
    const reservationDetails = useSelector(selectReservationDetails);
    const allSeats = useSelector(selectAllSeats);
    const selectedSeatIds = useSelector(selectSelectedSeatIds);
    const hallWidth = useSelector(selectHallWidth);
    const hallHeight = useSelector(selectHallHeight);

    useEffect(() => {
        dispatch(getSeatsAsync());
    }, []);

    useEffect(() => {
        let { seatCount, nextTo } = reservationDetails;
        
        if (nextTo) {
            selectSeatsNextToEachOther(seatCount);
        }
    }, [allSeats]);

    function handleSubmit() {
        dispatch(navigateTo('success'));
    }

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

    function selectSeatsNextToEachOther(count) {
        let seats = findSeatsNextToEachOther(count);
        if (seats === null) {
            return;
        }

        for (let seat of seats) {
            dispatch(selectSeat(seat.id));
        }
    }

    function findSeatsNextToEachOther(count) {
        let previousSeat = null;
        let stack = [];

        let sortByRows = (a, b) => (a.cords.x - b.cords.x) || (a.cords.y - b.cords.y);
        let seats = [...allSeats].sort(sortByRows);

        let isPreviousSeatNextTo = (seat) => {
            return (previousSeat.cords.x == seat.cords.x && previousSeat.cords.y == seat.cords.y - 1);
        }

        for (let seat of seats) {
            if (!seat.reserved && (previousSeat == null || isPreviousSeatNextTo(seat))) {
                stack.push(seat);

                if (stack.length == count) {
                    return stack;
                }
            }
            else {
                stack = [seat];
            }

            previousSeat = seat;
        }
        
        return null;
    }

    function renderSeatSkeletons() {
        let skeletons = [];

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 15; x++) {
                if (Math.random() > 0.5) {
                  continue;  
                }

                skeletons.push(
                    <div style={{ gridArea: `${y + 1} / ${x + 1}` }}>
                        <Skeleton.Avatar shape="square" active={true}/>
                    </div>
                );
            }
        }

        return skeletons;
    }
    
    function renderSeats() {
        if (loading) {
            return renderSeatSkeletons();
        }

        return allSeats.map((seat) => {
            return <div
                key={seat.id}
                className={seat.reserved ? styles.reservedSeat : isSeatSelected(seat.id) ? styles.selectedSeat : styles.seat}
                style={{ gridArea: `${seat.cords.x + 1} / ${seat.cords.y + 1}` }}
                onClick={() => toggleSeatSelection(seat.cords.x, seat.cords.y)}
            ></div>;
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.hallGrid} style={{
                gridTemplateColumns: `repeat(${hallHeight}, 1fr)`,
                gridTemplateRows: `repeat(${hallWidth}, 1fr)`
            }}>{
                renderSeats()
            }</div>
            <div className={styles.footer}>
                <ol className={styles.legend}>
                    <li>
                        <div className={styles.seat} />
                        <span>Miejsce dostępne</span>
                    </li>
                    <li>
                        <div className={styles.reservedSeat} />
                        <span>Miejsce zarezerwowane</span>
                    </li>
                    <li>
                        <div className={styles.selectedSeat} />
                        <span>Twój wybór</span>
                    </li>
                </ol>
                <Button type="primary" onClick={handleSubmit}>Rezerwuj</Button>
            </div>
        </div>
    );
}