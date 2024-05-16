import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Requisicion from '../components/Requisicion/Requisicion';
import CrearRequisicion from '../components/Requisicion/CrearRequisicion';
import ActualizarRequisicion from '../components/Requisicion/ActualizarRequisicion';

export default function RequisitionRoutes() {
  return (
    <Routes>
          <Route path='/requisicion' element={<Requisicion />}>  </Route>
          <Route path='/requisicion/crearrequisicion' element={<CrearRequisicion/>}>  </Route>
          <Route path='/requisicion/actualizarrequisicion/:id' element={<ActualizarRequisicion />}>  </Route>
    </Routes>
  );
}