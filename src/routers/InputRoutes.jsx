import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Entrada from '../components/Entrada/Entrada';
import CrearEntrada from '../components/Entrada/CrearEntrada';
import ActualizarEntrada from '../components/Entrada/ActualizarEntrada';
import ReporteEntrada from '../components/Reportes/ReporteEntrada';
import KardexReport from '../components/Reportes/kardex';


export default function InputRoutes() {
    return (
    <Routes>
        <Route path='/entrada' element={<Entrada />}/>
        <Route path='/reporteentrada' element={<ReporteEntrada />}/>
        <Route path='/kardex' element={<KardexReport />}/>
        <Route path='/entrada/crearentrada' element={<CrearEntrada />}/>  
        <Route path='/entrada/actualizarentrada/:id' element={<ActualizarEntrada />}/> 
    </Routes>
  );
}