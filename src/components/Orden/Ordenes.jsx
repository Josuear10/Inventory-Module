import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


function Ordenes() {
    const [Ordenes, setOrdenes] = useState([]); 

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/ordenes')
            .then(res => {
                console.log('Solicitud GET exitosa:', res); 
                setOrdenes(res.data);
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
                await axios.delete(`http://localhost:6060/ordenes/${id}`);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Orden eliminada.",
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
        <h2 className="mb-4 padding-top-25">Órdenes</h2>
            <div className='w-100 bg-white rounded p-3'>
                
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Orden</th>
                                <th>ID Traslado</th>
                                <th>ID Oficina</th>
                                <th>Fecha de orden</th>
                                <th>Cantidad de orden</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Ordenes.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.ORD_ID}</td>
                                    <td>{data.TRA_ID}</td>
                                    <td>{data.OFI_ID}</td>
                                    <td>{data.ORD_FECHA}</td>
                                    <td>{data.ORD_CANTIDAD}</td>

                                    <td>
                                        <Link to={`/ordenes/actualizarordenes/${data.ORD_ID}`} className="btn btn-primary btn-accion">Actualizar</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.ORD_ID)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/ordenes/crearordenes" className='btn btn-success mb-3'>Agregar</Link>
            </div>
        </div>
            
        </div>
    )
}

export default Ordenes;
