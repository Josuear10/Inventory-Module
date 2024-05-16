import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function DetalleOrden() {
    const [detalleOrden, setDetalleOrden] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/detalleorden')
            .then(res => {
                console.log('Solicitud GET exitosa:', res);
                setDetalleOrden(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/detalleorden/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Detalle Órdenes</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Departamento</th>
                                <th>ID Orden</th>
                                <th>ID Producto</th>
                                <th>Total Departamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleOrden.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.DTO_ID}</td>
                                    <td>{data.ORD_ID}</td>
                                    <td>{data.PRO_ID}</td>
                                    <td>{data.DTO_GRANTOTAL}</td>
                                    <td>
                                        <Link to={`/detalleorden/actualizardetalleorden/${data.DTO_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.DTO_ID)}>ELIMINAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/detalleorden/creardetalleorden" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>
        </div>
            
        </div>
    )
}
