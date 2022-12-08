import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import Appointments from './pages/ShopOwner/Appointments';
import Profile from './pages/ShopOwner/Profile';
import Navbar from './components/Navbar';
import MyShop from './pages/ShopOwner/MyShop';
import Quotes from './pages/ShopOwner/Quotes';
import QuoteDetails from './pages/ShopOwner/QuoteDetails';
import ShopDetails from './pages/ShopOwner/ShopDetails';
import Home from './pages/VehicleOwner/Home';
import VehicleOwnerAppointments from './pages/VehicleOwner/VehicleOwnerAppointments';
import VehicleOwnerQuotes from './pages/VehicleOwner/VehicleOwnerQuotes';

function App() {

  const [cookies] = useCookies(['refresh_token']);
  // const refresh = useRefreshToken();
  // If there is a stored refresh token, attempt a refresh.
  // useEffect(() => {
  //   if (cookies.refresh_token == null) return;
  //   console.log('Attempting a refresh');
  //   refresh?.();
  // }, []);

  //force a rerender when the refresh token changes (i.e when the user logs out or logs in)
  useEffect(() => {}, [cookies.refresh_token]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={cookies.refresh_token ? <MyShop /> : <Home />}/>
          <Route path='/login' element={!cookies.refresh_token ? <Login /> : <Navigate to ="/" />} />
          <Route path='/signup' element={!cookies.refresh_token ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/profile' element={cookies.refresh_token ? <Profile /> : <Navigate to="/login"/>} />
          <Route path='/appointments' element={cookies.refresh_token ? <Appointments /> : <VehicleOwnerAppointments />} />
          <Route path='/quotes' element={cookies.refresh_token ? <Quotes /> : <VehicleOwnerQuotes />} />
          <Route path='/quotes/:id' element={cookies.refresh_token ? <QuoteDetails /> : <Navigate to="/login" />} />
          <Route path='/shop/:id' element={<ShopDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
