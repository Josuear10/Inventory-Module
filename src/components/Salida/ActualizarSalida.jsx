import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
// eslint-disable-next-line
import "bootstrap/dist/css/bootstrap.min.css";

function ActualizarSalida() {
  const { id } = useParams();

  const [pro_id, setPid] = useState("");
  const [sal_fechasalida, setFsalida] = useState("");
  const [sal_movimiento, setMovimiento] = useState("");
  const [sal_unidadmedida, setUnidad] = useState("");
  const [sal_cantidad, setCantidad] = useState("");
  const [sal_preciosalida, setPrecios] = useState("");
  const [sal_serie, setSerie] = useState("");
  const [sal_nfel, setNfel] = useState("");
  const [cli_id, setCid] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID de la Salida:", id);
    // Fetch data for the specified OFIent ID (id)
    axios
      .get(`http://localhost:6060/salida/${id}`)
      .then((res) => {
        const data = res.data;

        setPid(data.PRO_ID);
        setFsalida(data.SAL_FECHASALIDA);
        setMovimiento(data.SAL_MOVIMIENTO);
        setUnidad(data.SAL_UNIDADMEDIDA);
        setCantidad(data.SAL_CANTIDAD);
        setPrecios(data.SAL_PRECIOSALIDA);
        setSerie(data.SAL_SERIE);
        setNfel(data.SAL_NFEL);
        setCid(data.CLI_ID);
        
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:6060/salida/${id}`, {
        pro_id,
        sal_fechasalida,
        sal_movimiento,
        sal_unidadmedida,
        sal_cantidad,
        sal_preciosalida,
        sal_serie,
        sal_nfel,
        cli_id,

      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex bg-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h3>Actualizar Salida</h3>

          <div className="mb-2">
            <label htmlFor="">Producto ID </label>
            <input
              type="text"
              className="form-control"
              value={pro_id}
              onChange={(e) => setPid(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Fecha Salida</label>
            <input
              type="text"
              className="form-control"
              value={sal_fechasalida}
              onChange={(e) => setFsalida(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Movimiento </label>
            <input
              type="text"
              className="form-control"
              value={sal_movimiento}
              onChange={(e) => setMovimiento(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Unidad de Medida</label>
            <input
              type="text"
              className="form-control"
              value={sal_unidadmedida}
              onChange={(e) => setUnidad(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Cantidad</label>
            <input
              type="text"
              className="form-control"
              value={sal_cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Precio de Salida </label>
            <input
              type="text"
              className="form-control"
              value={sal_preciosalida}
              onChange={(e) => setPrecios(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Serie</label>
            <input
              type="text"
              className="form-control"
              value={sal_serie}
              onChange={(e) => setSerie(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Numero de Factura </label>
            <input
              type="text"
              className="form-control"
              value={sal_nfel}
              onChange={(e) => setNfel(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Cliente ID</label>
            <input
              type="text"
              className="form-control"
              value={cli_id}
              onChange={(e) => setCid(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end align-items-center gap-10">
            <button type="submit" href="/salida" className="btn btn-primary mb-2">Actualizar</button>
            <Link to="/salida" className="btn btn-danger mb-2">Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActualizarSalida;
