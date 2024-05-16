import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


function Detalleproducto() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/empleados')
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
            await axios.delete(`http://localhost:6060/empleados/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
           
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Empleados</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Empleado</th>
                                <th>Primer Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Puesto Empleado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.EMP_ID}</td>
                                    <td>{data.EMP_PRIMERNOMBRE}</td>
                                    <td>{data.EMP_SEGUNDONOMBRE}</td>
                                    <td>{data.EMP_PRIMERAPELLIDO}</td>
                                    <td>{data.EMP_SEGUNDOAPELLIDO}</td>
                                    <td>{data.EMP_PUESTO}</td>
                                    <td>
                                        <Link to={`actualizarempleados/${data.EMP_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.EMP_ID)}>ELIMINAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/empleados/crearempleados" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>
        </div>
            
        </div>
    )
}

export default Detalleproducto;
