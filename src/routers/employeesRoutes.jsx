import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/Empleados/Empleados';
import CrearEmpleados from '../components/Empleados/CrearEmpleados';
import ActualizarEmpleados from '../components/Empleados/ActualizarEmpleados';

export default function EmployeesRoutes() {
  return (
    <Routes>
          <Route path='/empleados' element={<Empleados />}>  </Route>
          <Route path='/empleados/crearempleados' element={<CrearEmpleados/>}>  </Route>
          <Route path='/empleados/actualizarempleados/:id' element={<ActualizarEmpleados />}>  </Route>
    </Routes>
  );
}