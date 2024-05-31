import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Salida from '../components/Salida/Salida';
import CrearSalida from '../components/Salida/CrearSalida';
import ActualizarSalida from '../components/Salida/ActualizarSalida';
import ReporteSalida from '../components/Reportes/ReporteSalida';
import TopProveedores from '../components/Reportes/TopProveedores';

export default function OutputRoutes() {
  return (
    <Routes>
          <Route path='/salida' element={<Salida />}>  </Route>
          <Route path='/reportesalida' element={<ReporteSalida />}>  </Route>
          <Route path='/topproveedores' element={<TopProveedores />}>  </Route>
          <Route path='/salida/crearsalida' element={<CrearSalida/>}>  </Route>
          <Route path='/salida/actualizarsalida/:id' element={<ActualizarSalida />}>  </Route>
    </Routes>
  );
}