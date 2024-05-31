import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Salida() {
  const [Salida, setSalida] = useState([]);

  useEffect(() => {
    console.log("Realizando solicitud GET...");
    axios
      .get("http://localhost:6060/salida")
      .then((res) => {
        console.log("Solicitud GET exitosa:", res);
        setSalida(res.data);
      })
      .catch((err) => {
        console.log("Error en la solicitud GET:", err);
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
            await axios.delete(`http://localhost:6060/salida/${id}`);
            Swal.fire({
                title: "Eliminado!",
                text: "Salida eliminada.",
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
    <h2 className="mb-4 padding-top-25">Salidas</h2>
      <div className="w-100 bg-white rounded p-3">     
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID Salida</th>
                <th>ID Producto</th>
                <th>Fecha de Salida</th>
                <th>Movimiento</th>
                <th>Unidad de Medida</th>
                <th>Cantidad</th>
                <th>Precio de Salida</th>
                <th>Serie</th>
                <th>FEL</th>
                <th>Cliente ID</th>
              </tr>
            </thead>
            <tbody>
              {Salida.map((data, i) => (
                <tr key={i}>
                  <td>{data.SAL_ID}</td>
                  <td>{data.PRO_ID}</td>
                  <td>{data.SAL_FECHASALIDA}</td>
                  <td>{data.SAL_MOVIMIENTO}</td>
                  <td>{data.SAL_UNIDADMEDIDA}</td>
                  <td>{data.SAL_CANTIDAD}</td>
                  <td>{data.SAL_PRECIOSALIDA}</td>
                  <td>{data.SAL_SERIE}</td>
                  <td>{data.SAL_NFEL}</td>
                  <td>{data.CLI_ID}</td>

                  <td>
                  <div className="d-flex flex-column justify-content-center align-items-center gap-10">
                    <Link
                      to={`/salida/actualizarsalida/${data.SAL_ID}`}
                      className="btn btn-primary btn-accion"
                    >
                      ACTUALIZAR
                    </Link>
                    <button
                      className="btn btn-danger ms-2 btn-accion"
                      onClick={() => handleDelete(data.SAL_ID)}
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
        <Link to="/salida/crearsalida" className="btn btn-success mb-3">
          AGREGAR
        </Link>
      </div>
    </div>
    
    </div>
  );
}

export default Salida;
