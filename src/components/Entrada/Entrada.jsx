import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Entrada() {
    const [entrada, setEntrada] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/entrada')
            .then(res => {
                console.log('Solicitud GET exitosa:', res);
                setEntrada(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/entrada/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Entrada</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID entrada</th>
                                <th>ID Producto</th>
                                <th>Fecha Entrada</th>
                                <th>Movimiento</th>
                                <th>Unidad de Medida</th>
                                <th>Cantidad</th>
                                <th>Precio Salida</th>
                                <th>ID Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entrada.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.ENT_ID}</td>
                                    <td>{data.PRO_ID}</td>
                                    <td>{data.ENT_FECHAENTRADA}</td>
                                    <td>{data.ENT_MOVIMIENTO}</td>
                                    <td>{data.ENT_UNIDADMEDIDA}</td>
                                    <td>{data.ENT_CANTIDAD}</td>
                                    <td>{data.ENT_PRECIOSALIDA}</td>
                                    <td>{data.PRV_ID}</td>

                                    <td>
                                        <div className="d-flex flex-column justify-content-center align-items-center gap-10">
                                            <Link to={`actualizarentrada/${data.ENT_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                            <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.ENT_ID)}>ELIMINAR</button>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/entrada/crearentrada" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>
        </div>
            
        </div>
    )
}
