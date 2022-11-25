import React from 'react';
//import Home from './pages/Home';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import useRefreshToken from './utilities/hooks/useRefreshToken';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import MyShop from './pages/MyShop';
import AppointmentDetails from "./pages/AppointmentDetails";
import Quotes from './pages/Quotes';
import QuoteDetails from './pages/QuoteDetails';
import ShopDetails from './pages/ShopDetails';
import Home from './pages/Home';
export const API_ROOT: string = "https://sayyara.herokuapp.com/api";

function App() {

  const [cookies] = useCookies(['refresh_token']);
  // const refresh = useRefreshToken();
  // If there is a stored refresh token, attempt a refresh.
  // useEffect(() => {
  //   if (cookies.refresh_token == null) return;
  //   console.log('Attempting a refresh');
  //   refresh?.();
  // }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={cookies.refresh_token ? <MyShop /> : <Home />}/>
          <Route path='/login' element={!cookies.refresh_token ? <Login /> : <Navigate to ="/" />} />
          <Route path='/signup' element={!cookies.refresh_token ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/profile' element={cookies.refresh_token ? <Profile /> : <Navigate to="/login"/>} />
          <Route path='/appointments' element={cookies.refresh_token ? <Appointments /> : <Navigate to="/login" />} />
          <Route path='/appointments/:id' element={cookies.refresh_token ? <AppointmentDetails /> : <Navigate to="/login" />} />
          <Route path='/quotes' element={cookies.refresh_token ? <Quotes /> : <Navigate to="/login" />} />
          <Route path='/quotes/:id' element={cookies.refresh_token ? <QuoteDetails /> : <Navigate to="/login" />} />
          <Route path='/shop/:id' element={<ShopDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
