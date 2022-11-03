import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export const API_ROOT: string = "https://domain.com/api/..." // TODO: Change to appropriate API root path

function App() {

  // This guard clause makes it so that if the user does not have an auth token stored,
  // they can only access the login and signup pages.
  
  // === Uncomment when authentication is fully implemented ===
  // const [cookies] = useCookies(['auth_token']);
  // if (cookies.auth_token == null) {
  //   return (
  //     <div>
  //       <Router>
  //         <Navbar />
  //         <Routes>
  //           <Route path='/' element={<Login />} />
  //           <Route path='/SignUp' element={<SignUp />} />
  //         </Routes>
  //       </Router>
  //     </div>
  //   );
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
