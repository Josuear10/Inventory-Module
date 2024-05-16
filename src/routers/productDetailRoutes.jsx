import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetalleProducto from '../components/DetalleProducto/DetalleProducto';
import CrearDetalleProducto from '../components/DetalleProducto/CrearDetalleProducto';
import ActualizarDetalleProducto from '../components/DetalleProducto/ActualizarDetalleProducto';

export default function ProductDetailRoutes() {
  return (
    <Routes>
          <Route path='/detalleproducto' element={<DetalleProducto />}/> 
          <Route path='/detalleproducto/creardetalleproducto' element={<CrearDetalleProducto/>}/> 
          <Route path='/detalleproducto/actualizardetalleproducto/:id' element={<ActualizarDetalleProducto />}/> 
    </Routes>
  );
}