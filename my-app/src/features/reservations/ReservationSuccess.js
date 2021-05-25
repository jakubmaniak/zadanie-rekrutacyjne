import { Result } from 'antd';
import styles from './ReservationSuccess.module.css';

export default function ReservationSuccess() {
    return (
        <Result
            status="success"
            title="Twoja rezerwacja przebiegła pomyślnie!"
            subTitle={
                <div className={styles.subTitle}>
                    <p>Wybrałeś miejsca:</p>
                    <p>- rząd x1, miejsce y1 (id1)</p>
                    <p>- rząd x2, miejsce y1 (id2)</p>
                    <p>- rząd x1, miejsce y2 (id3)</p>
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