import React, { useEffect } from 'react';
//import Home from './pages/Home';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useRefreshToken from './utilities/hooks/useRefreshToken';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import MyShop from './pages/MyShop';
import useAuth from './utilities/hooks/useAuth';

export const API_ROOT: string = "https://sayyara.herokuapp.com/api";

function App() {

  // @ts-ignore
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

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
          <Route path='/' element={auth ? <MyShop /> : <Navigate to="/login" />}/>
          <Route path='/login' element={!auth ? <Login /> : <Navigate to ="/" />} />
          <Route path='/SignUp' element={!auth ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/home' element={auth ? <MyShop /> : <Navigate to="/login"/>} />
          <Route path='/appointments' element={auth ? <Appointments /> : <Navigate to="/login" />} />
          <Route path='/profile' element={auth ? <Profile /> : <Navigate to="/login"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
