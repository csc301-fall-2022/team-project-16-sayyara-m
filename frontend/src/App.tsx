import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
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
