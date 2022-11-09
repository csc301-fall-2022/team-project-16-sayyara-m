import React, { useEffect } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useRefreshToken from './utilities/hooks/useRefreshToken';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import MyShop from './pages/MyShop';

export const API_ROOT: string = "https://sayyara.herokuapp.com/api";

function App() {

  // @ts-ignore
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const refresh = useRefreshToken();

  // If there is a stored refresh token, attempt a refresh.
  useEffect(() => {
    if (cookies.refresh_token == null) return;
    console.log('Attempting a refresh');
    refresh?.();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<MyShop />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
