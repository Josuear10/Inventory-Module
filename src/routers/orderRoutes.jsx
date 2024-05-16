import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Ordenes from '../components/Orden/Ordenes';
import CrearOrden from '../components/Orden/CrearOrden';
import ActualizarOrdenes from '../components/Orden/ActualizarOrdenes';

export default function OrderRoutes() {
  return (
    <Routes>
          <Route path='/ordenes' element={<Ordenes />}>  </Route>
          <Route path='/ordenes/crearordenes' element={<CrearOrden/>}>  </Route>
          <Route path='/ordenes/actualizarordenes/:id' element={<ActualizarOrdenes />}>  </Route>
    </Routes>
  );
}