import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cliente() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
      console.log('Realizando solicitud GET...');
      axios.get('http://localhost:6060/cliente')
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
            await axios.delete(`http://localhost:6060/cliente/${id}`);
            Swal.fire({
                title: "Eliminado!",
                text: "Eliminado exitosamente.",
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
      <h2 className="mb-4 padding-top-25">Clientes</h2>
          <div className='w-100 bg-white rounded p-3'>
            <div className="table-responsive">
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>ID Cliente</th>
                    <th>NIT</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Departamento</th>
                    <th>Municipio</th>   
                    <th>No. Casa</th>
                    <th>Calle</th>
                    <th>Avenida</th> 
                    <th>Zona</th>                 
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((data, i) => (
                    <tr key={i}>
                      <td>{data.CLI_ID}</td>
                      <td>{data.CLI_NIT}</td>
                      <td>{data.CLI_PRIMERNOMBRE}</td>
                      <td>{data.CLI_SEGUNDONOMBRE}</td>
                      <td>{data.CLI_PRIMERAPELLIDO}</td>
                      <td>{data.CLI_SEGUNDOAPELLIDO}</td>
                      <td>{data.CLI_DEPARTAMENTO}</td>
                      <td>{data.CLI_MUNICIPIO}</td>
                      <td>{data.CLI_NCASA}</td>
                      <td>{data.CLI_CALLE}</td>
                      <td>{data.CLI_AVENIDA}</td>
                      <td>{data.CLI_ZONA}</td>
                      <td>
                        <div className="d-flex flex-column justify-content-center align-items-center gap-10">
                          <Link to={`actualizarcliente/${data.CLI_ID}`} className="btn btn-primary btn-accion">ACTUALIZAR</Link>
                          <button className="btn btn-danger ms-2 btn-accion" onClick={() => handleDelete(data.CLI_ID)}>ELIMINAR</button>
                        </div>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/cliente/crearcliente" className='btn btn-success mb-3'>AGREGAR</Link>
          </div>
        </div>
        </div>
          
      )
}


