import './App.css';
import 'antd/dist/antd.css';

import React from 'react';
import { useSelector } from 'react-redux';
import Layout from 'antd/lib/layout/layout';

import ReservationDetails from './components/reservation/ReservationDetails';
import ReservationSeats from './components/reservation/ReservationSeats';
import ReservationSuccess from './components/reservation/ReservationSuccess';
import { selectCurrentPage } from './features/navigation/navigationSlice';


function App() {
  const currentPage = useSelector(selectCurrentPage);

  function renderCurrentPage() {
    switch (currentPage) {
      case 'details':
        return <ReservationDetails/>;
      case 'seats':
        return <ReservationSeats/>;
      case 'success':
        return <ReservationSuccess/>;
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <div className="App-container">
        <Layout style={{ padding: '16px 24px' }}>{renderCurrentPage()}</Layout>
      </div>
    </div>
  );
}

export default App;
