import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </Router>
    );
}

export default App;
