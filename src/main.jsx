import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard  from './pages/Dashboard'
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reproductor" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
