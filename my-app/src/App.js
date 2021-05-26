import './App.css';
import 'antd/dist/antd.css';

import React from 'react';
import Layout from 'antd/lib/layout/layout';
import ReservationDetails from './features/reservations/ReservationDetails';
import ReservationSeats from './features/reservations/ReservationSeats';
import ReservationSuccess from './features/reservations/ReservationSuccess';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Layout style={{ padding: '16px 24px' }}>
          <ReservationSeats/>
        </Layout>
      </div>
    </div>
  );
}

export default App;
