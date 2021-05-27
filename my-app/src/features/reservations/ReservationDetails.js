import styles from './ReservationDetails.module.css'

import { useDispatch } from 'react-redux';
import { Button, Checkbox, Form, InputNumber } from 'antd';

import { navigateTo } from '../navigation/navigationSlice';
import { setReservationDetails } from '../seats/seatsSlice';


export default function ReservationDetails() {
    const dispatch = useDispatch();
    
    function handleSubmit(formData) {
        dispatch(setReservationDetails(formData));
        dispatch(navigateTo('seats'));
    }

    return (
        <Form
            className={styles.form}
            onFinish={handleSubmit}
            initialValues={{ nextTo: true }}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 12 }}
        >
            <Form.Item
                name="seatCount"
                label="Liczba miejsc"
                labelAlign="left"
                rules={[{ required: true, message: 'To pole jest wymagane!' }]}
            >
                <InputNumber className={styles.input} />
            </Form.Item>

            <Form.Item name="nextTo" valuePropName="checked">
                <Checkbox>Czy miejsca mają być obok siebie?</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button className={styles.button} type="primary" size="large" htmlType="submit">Wybierz miejsca</Button>
            </Form.Item>
        </Form>
    );
}