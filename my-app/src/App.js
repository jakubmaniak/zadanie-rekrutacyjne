import './App.css';
import 'antd/dist/antd.css';

import React from 'react';
import Layout from 'antd/lib/layout/layout';
import ReservationSuccess from './features/reservations/ReservationSuccess';
import ReservationDetails from './features/reservations/ReservationDetails';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Layout style={{ padding: '16px 24px' }}>
          <ReservationDetails/>
        </Layout>
      </div>
    </div>
  );
}

export default App;
