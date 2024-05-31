import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
function CrearSalida() {
 const [pro_id, setPid] = useState("");
 const [sal_fechasalida, setFsalida] = useState("");
 const [sal_movimiento, setMovimiento] = useState("");
 const [sal_unidadmedida, setUnidad] = useState("");
 const [sal_cantidad, setCantidad] = useState("");
 const [sal_preciosalida, setPrecios] = useState("");
 
 const [cli_id, setCid] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:6060/salida", {
        pro_id,
        sal_fechasalida,
        sal_movimiento,
        sal_unidadmedida,
        sal_cantidad,
        sal_preciosalida,
        cli_id,
      })
      .then(res => {
        console.log(res);
        Swal.fire({
            icon: "success",
            title: "Creado...",
            text: "Salida creada exitosamente!",
        }).then(() => {
            navigate('/salida');  
        });
    })
    .catch(err => {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo ha salido mal!",
        });
    });
  }

  return (
    <div className="d-flex bg-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h3>Agregar Salida</h3>

          <div className="mb-2">
            <label htmlFor="">Producto ID</label>
            <input
              type="text"
              placeholder="Ingrese el ID del Producto"
              className="form-control"
              value={pro_id}
              onChange={(e) => setPid(e.target.value)}
            />
          </div>
          <div className="mb-2">
          <label htmlFor="ent_fechsalida">Fecha Salida</label>
          <input
          type="date"
          id="ent_fechasalida"
          className="form-control"
          value={sal_fechasalida}
          onChange={e => setFsalida(e.target.value)}
          />
          </div>

          <div className="mb-2">
          <label htmlFor="ent_movimiento">Movimiento</label>
          <select
          id="ent_movimiento"
          className="form-control"
          value={sal_movimiento}
          onChange={e => setMovimiento(e.target.value)}>
          <option value="">Seleccione un movimiento</option>
          <option value="1">1. Ventas</option>
          <option value="2">2. Devolucion y rebaja sobre compras</option>
          </select>
          </div>

          <div className="mb-2">
            <label htmlFor="">Unidad de Medida</label>
            <input
              type="text"
              placeholder="Ingrese la unidad de medida"
              className="form-control"
              value={sal_unidadmedida}
              onChange={(e) => setUnidad(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Cantidad</label>
            <input
              type="text"
              placeholder="Ingrese la cantidad"
              className="form-control"
              value={sal_cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Precio de Salida</label>
            <input
              type="text"
              placeholder="Ingrese el Precio de Salida"
              className="form-control"
              value={sal_preciosalida}
              onChange={(e) => setPrecios(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Cliente ID</label>
            <input
              type="text"
              placeholder="Ingrese el ID del Cliente"
              className="form-control"
              value={cli_id}
              onChange={(e) => setCid(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end align-items-center gap-10">
            <button type="submit" href="/salida" className="btn btn-success mb-2">Guardar</button>
            <Link to="/salida" className="btn btn-danger mb-2">Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearSalida;
