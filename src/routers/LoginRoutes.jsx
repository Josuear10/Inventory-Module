import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';

export default function GreetingRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}