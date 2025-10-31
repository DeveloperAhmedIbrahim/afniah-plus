// App.js
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from './pages/users/Home'
import About from './pages/users/About'
import Destination from './pages/users/Destination'
import Contact from './pages/users/Contact'
import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { LocalizationProvider } from './contexts/LocalizationContext';

function Layout() {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart();
      setTimeout(() => {
        ref.current.complete();
      }, 600);
    }
  }, [location]);

  return (
    <>
      <LoadingBar color="#A95E30" ref={ref} height={3} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Layout />
      </Router>
    </LocalizationProvider>
  );
}

export default App;