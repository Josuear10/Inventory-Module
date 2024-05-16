import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


export default function DetalleProducto() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/detalleproducto')
            .then(res => {
                console.log('Solicitud GET exitosa:', res);
                setClientes(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/detalleproducto/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
            
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Detalle Productos</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Departamento</th>
                                <th>ID Proveedor</th>
                                <th>Nombre Categoria</th>
                                <th>Dpt. Categoria</th>
                                <th>Stock Minimo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.DTP_ID}</td>
                                    <td>{data.PRO_ID}</td>
                                    <td>{data.DTP_NOMBRECATEGORIA}</td>
                                    <td>{data.DTP_CATEGORIA}</td>
                                    <td>{data.DTP_STOCKMINIMO}</td>
                                    <td>
                                        <Link to={`actualizardetalleproducto/${data.DTP_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.DTP_ID)}>ELIMINAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/detalleproducto/creardetalleproducto" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>
        </div>
            
        </div>
    )
}

