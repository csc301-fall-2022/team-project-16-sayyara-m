import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
      </Routes>
    </Router>
    );
}

export default App;
