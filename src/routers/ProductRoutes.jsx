import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Producto from '../components/Producto/Producto';
import CrearProducto from '../components/Producto/CrearProducto';
import ActualizarProducto from '../components/Producto/ActualizarProducto';

export default function ProductRoutes() {
  return (
    <Routes>
        <Route path='/producto' element={<Producto />}/> 
        <Route path='/producto/crearproducto' element={<CrearProducto />}/>
        <Route path='/producto/actualizarproducto/:id' element={<ActualizarProducto />}/> 
    </Routes>
  );
}
