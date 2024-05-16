import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Oficina from '../components/Oficinas/Oficinas';
import CrearOficina from '../components/Oficinas/CrearOficina';
import ActualizarOficina from '../components/Oficinas/ActualizarOficinas';

export default function OfficeRoutes() {
  return (
    <Routes>
          <Route path='/oficina' element={<Oficina />}>  </Route>
          <Route path='/oficina/crearoficina' element={<CrearOficina/>}>  </Route>
          <Route path='/oficina/actualizaroficina/:id' element={<ActualizarOficina />}>  </Route>
    </Routes>
  );
}