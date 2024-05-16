import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Proveedor from '../components/Proveedor/Proveedor';
import CrearProveedor from '../components/Proveedor/CrearProveedor';
import ActualizarProveedor from '../components/Proveedor/ActualizarProveedor';

export default function ProviderRoutes() {
  return (
    <Routes>
          <Route path='/proveedores' element={<Proveedor />}>  </Route>
          <Route path='/proveedores/crearproveedores' element={<CrearProveedor/>}>  </Route>
          <Route path='/proveedores/actualizarproveedores/:id' element={<ActualizarProveedor />}>  </Route>
    </Routes>
  );
}