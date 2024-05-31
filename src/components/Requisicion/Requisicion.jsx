import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


function Requisicion() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/requisicion')
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
            const result = await Swal.fire({
                title: "Estás seguro?",
                text: "No serás capaz de revertirlo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, eliminarlo!"
            });
    
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:6060/requisicion/${id}`);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Requisicion eliminada.",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo ha salido mal!",
            });
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Requisiciones</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Requisicion</th>
                                <th>Fecha</th>
                                <th>ID Producto</th>
                                <th>Cantidad</th>
                                <th>ID Empleado</th>
                                <th>ID oficina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.REQ_ID}</td>
                                    <td>{data.REQ_FECHA}</td>
                                    <td>{data.PRO_ID}</td>
                                    <td>{data.REQ_CANTIDAD}</td>
                                    <td>{data.EMP_ID}</td>
                                    <td>{data.OFI_ID}</td>
                                    <td>
                                        <Link to={`actualizarrequisicion/${data.REQ_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.REQ_ID)}>ELIMINAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/requisicion/crearrequisicion" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>
        </div>
            
        </div>
    )
}

export default Requisicion;
