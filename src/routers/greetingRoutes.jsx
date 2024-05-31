import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Greeting from '../components/Greeting/Greeting';

export default function GreetingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Greeting />} />
    </Routes>
  );
}