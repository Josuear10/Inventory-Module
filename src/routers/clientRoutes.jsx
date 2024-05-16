import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cliente from '../components/Cliente/Cliente';
import CrearCliente from '../components/Cliente/CrearCliente';
import ActualizarCliente from '../components/Cliente/ActualizarCliente';

export default function ClientRoutes() {
  return (
    <Routes>
        <Route path='/cliente' element={<Cliente />}/> 
        <Route path='/cliente/crearcliente' element={<CrearCliente />}/>  
        <Route path='/cliente/actualizarcliente/:id' element={<ActualizarCliente />}/> 
    </Routes>
  );
}