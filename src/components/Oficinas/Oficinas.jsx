import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


function Oficinas() {
    const [oficinas, setOficinas] = useState([]); 

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/oficina')
            .then(res => {
                console.log('Solicitud GET exitosa:', res); 
                setOficinas(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/oficina/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
            // Manejar el error de eliminación aquí
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Oficinas</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID-Oficina</th>
                                <th>Nombre Oficina</th>
                                <th>Numero de Oficina</th>
                                <th>Calle</th>
                                <th>Avenida</th>
                                <th>Zona</th>
                                <th>Municipio</th>
                                <th>Departamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oficinas.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.OFI_ID}</td>
                                    <td>{data.OFI_NOMBRE}</td>
                                    <td>{data.OFI_NUMERO}</td>
                                    <td>{data.OFI_CALLE}</td>
                                    <td>{data.OFI_AVENIDA}</td>
                                    <td>{data.OFI_ZONA}</td>
                                    <td>{data.OFI_MUNICIPIO}</td>
                                    <td>{data.OFI_DEPARTAMENTO}</td>

                                    <td>
                                        <Link to={`ActualizarOficina/${data.OFI_ID}`} className="btn btn-primary btn-accion">Actualizar</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.OFI_ID)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/oficina/crearoficina" className='btn btn-success mb-3'>Agregar</Link>
            </div>
        </div>
            
        </div>
    )
}

export default Oficinas;
