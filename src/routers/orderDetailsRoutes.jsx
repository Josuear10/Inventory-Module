import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetalleOrden from '../components/DetalleOrden/DetalleOrden';
import CrearDetalleOrden from '../components/DetalleOrden/CrearDetalleOrden';
import ActualizarDetalleOrden from '../components/DetalleOrden/ActualizarDetalleOrden';

export default function OrderDetailsRoutes() {
  return (
    <Routes>
          <Route path='/detalleorden' element={<DetalleOrden />}>  </Route>
          <Route path='/detalleorden/creardetalleorden' element={<CrearDetalleOrden/>}>  </Route>
          <Route path='/detalleorden/actualizardetalleorden/:id' element={<ActualizarDetalleOrden />}>  </Route>
    </Routes>
  );
}