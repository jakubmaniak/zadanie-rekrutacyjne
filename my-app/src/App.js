import React from 'react';
import Layout from 'antd/lib/layout/layout';
import ReservationSuccess from './features/reservations/ReservationSuccess';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Layout style={{ padding: '16px 24px' }}>
          <ReservationSuccess/>
        </Layout>
      </div>
    </div>
  );
}

export default App;
