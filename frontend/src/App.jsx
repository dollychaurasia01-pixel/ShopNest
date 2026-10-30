import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/SearchBar';

import { Home } from './pages/Home';
import Loginpage from './pages/Loginpage';

function App() {
  return (
   <Router>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginpage />} />
    </Routes>
    
   </Router>
  );
} 
export default App;