import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gateways from './pages/Gateways';
import Dispositivos from './pages/Dispositivos';
import Sensores from './pages/Sensores';
import Leituras from './pages/Leituras';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const token = useSelector(state => state.auth.token);
  const location = useLocation();

  const showHeader = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div id="root" className="d-flex flex-column min-vh-100">
      {showHeader && <Header />}
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gateways" element={token ? <Gateways /> : <Navigate to="/login" />} />
          <Route path="/dispositivos" element={token ? <Dispositivos /> : <Navigate to="/login" />} />
          <Route path="/sensores" element={token ? <Sensores /> : <Navigate to="/login" />} />
          <Route path="/leituras" element={token ? <Leituras /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
