import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
// import "./Producto.css"; // Importa el archivo CSS para estilos específicos

export default function Producto() {
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/producto')
            .then(res => {
                console.log('Solicitud GET exitosa:', res);
                setProducto(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/producto/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
            // Manejar el error de eliminación aquí
        }
    }
    

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-4 padding-top-25">Productos</h2>
            <div className='w-100 bg-white rounded p-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Producto</th>
                                <th>Unidad de Medida</th>
                                <th>Descripcion Medida</th>
                                <th>Cantidad Stock</th>
                                <th>Valor Unitario</th>
                                <th>ID Oficina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producto.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.PRO_ID}</td>
                                    <td>{data.PRO_NOMBRE}</td>
                                    <td>{data.PRO_UNIDADDEMEDIDA}</td>
                                    <td>{data.PRO_DESCRIPCION}</td>
                                    <td>{data.PRO_CANTIDAD}</td>
                                    <td>{data.PRO_VALOR}</td>
                                    <td>{data.OFI_ID}</td>
                                    
                                    <td>
                                        <Link to={`actualizarproducto/${data.PRO_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                                        <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.PRO_ID)}>ELIMINAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <Link to="/producto/crearproducto" className='btn btn-success mb-3'>AGREGAR</Link>
            </div>

            </div>
            
        </div>
    )
}
