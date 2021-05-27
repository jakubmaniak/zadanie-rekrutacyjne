import styles from './ReservationSuccess.module.css';

import { useSelector } from 'react-redux';
import { Result } from 'antd';

import { selectSelectedSeats } from '../../features/seats/seatsSlice';


export default function ReservationSuccess() {
    const selectedSeats = useSelector(selectSelectedSeats);

    return (
        <Result
            status="success"
            title={
                <p className={styles.title}>Twoja rezerwacja przebiegła pomyślnie!</p>
            }
            subTitle={
                <div className={styles.subTitle}>
                    <p>Wybrałeś miejsca:</p>
                    {selectedSeats.map((seat) => (
                        <p>- rząd {seat.cords.x}, miejsce {seat.cords.y} ({seat.id})</p>
                    ))}
                </div>
            }
            extra={
                <div className={styles.extra}>
                    <p>Dziękujemy!</p>
                    <p>W razie problemów prosimy o kontakt z działem administracji.</p>
                </div>
            }
        />
    );
}