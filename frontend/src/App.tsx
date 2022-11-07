import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export const API_ROOT: string = "https://sayyara.herokuapp.com/api";

function App() {


  // If the user has a refresh token stored in the cookie, use it to get a new access token
  // by calling the refresh API endpoint
  // const [cookies, setCookie] = useCookies(['refresh_token']);
  // if (accessToken == null && cookies.refresh_token != null) {
  //   const url: string = API_ROOT + "token/refresh";
  //   const authStr: string = "Bearer " + cookies.refresh_token;
    
  //   fetch(url, { headers: { 'Authorization': authStr } })
  //   .then((response) => {
  //     response.json()
  //     .then((parsedJson) => {
  //       // We get a 403 status when the authentication fails
  //       if (response.status === 403) {
  //         console.log("Failed to authenticate.");
  //         console.error(parsedJson.error_message);
  //       } else if (response.ok) {
  //         setAccessToken(parsedJson.access_token);
  //         setCookie('refresh_token', parsedJson.refresh_token, { path: '/' });
  //         console.log("Authenticated successfully.");
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("Failed to parse the refresh request response as JSON.");
  //       console.error(e);
  //     })
  //   })
  //   .catch((e) => {
  //     console.log("Failed to make the authentication HTTP request.");
  //     console.error(e);
  //   });
  // }

  return (
    <div>
      <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
