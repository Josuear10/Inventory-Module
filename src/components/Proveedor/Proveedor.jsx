import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


function Proveedor() {
    const [Proveedor, setProveedor] = useState([]);

    useEffect(() => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/proveedores')
            .then(res => {
                console.log('Solicitud GET exitosa:', res); 
                setProveedor(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6060/proveedores/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
            // Manejar el error de eliminación aquí
        }
    }
    

    return (
      <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
      <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mb-4 padding-top-25">Proveedores</h2>
        <div className="w-100 bg-white rounded p-3">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Prv. ID</th>
                  <th>Prv. NIT</th>
                  <th>Prv. Razon Social</th>
                  <th>Prv. Nombre</th>
                  <th>Prv. Local</th>
                  <th>Prv. Calle</th>
                  <th>Prv. Zona</th>
                  <th>Prv. Avenida</th>
                  <th>Prv. Municipio</th>
                  <th>Prv. Departamento</th>
                </tr>
              </thead>
              <tbody>
                {Proveedor.map((data, i) => (
                  <tr key={i}>
                    <td>{data.PRV_ID}</td>
                    <td>{data.PRV_NIT}</td>
                    <td>{data.PRV_RAZONSOCIAL}</td>
                    <td>{data.PRV_NOMBRE}</td>
                    <td>{data.PRV_NLOCAL}</td>
                    <td>{data.PRV_CALLE}</td>
                    <td>{data.PRV_ZONA}</td>
                    <td>{data.PRV_AVENIDA}</td>
                    <td>{data.PRV_MUNICIPIO}</td>
                    <td>{data.PRV_DEPARTAMENTO}</td>

                    <td>
                      <div className="d-flex flex-column justify-content-center align-items-center gap-10">
                        <Link
                        to={`/proveedores/actualizarproveedores/${data.PRV_ID}`}
                        className="btn btn-primary btn-accion"
                      >
                        ACTUALIZAR
                      </Link>
                      <button
                        className="btn btn-danger ms-2 btn-accion"
                        onClick={() => handleDelete(data.PRV_ID)}
                      >
                        ELIMINAR
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/proveedores/crearproveedores" className="btn btn-success mb-3">AGREGAR</Link>
        </div>
      </div>
      
      </div>
    );
}

export default Proveedor;
