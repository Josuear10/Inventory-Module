import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
// eslint-disable-next-line 
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

  
function ActualizarProveedor() {
    const { id } = useParams();
    
    const [prv_nit, setNit] = useState('');
    const [prv_razonsocial, setRazon] = useState("");
    const [prv_nombre, setNombre] = useState("");
    const [prv_nlocal, setNlocal] = useState("");
    const [prv_calle, setCalle] = useState("");
    const [prv_zona, setZona] = useState("");
    const [prv_avenida, setAvenida] = useState("");
    const [prv_municipio, setMunicipio] = useState("");
    const [prv_departamento, setDepartamento] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID del Proveedor:', id);
        // Fetch data for the specified OFIent ID (id)
        axios.get(`http://localhost:6060/proveedores/${id}`)
            .then(res => {
                const data = res.data;
                
                setNit(data.PRV_NIT);
                setRazon(data.PRV_RAZONSOCIAL);
                setNombre(data.PRV_NOMBRE);
                setNlocal(data.PRV_NLOCAL);
                setCalle(data.PRV_CALLE);
                setZona(data.PRV_ZONA);
                setAvenida(data.PRV_AVENIDA);
                setMunicipio(data.PRV_MUNICIPIO);
                setDepartamento(data.PRV_DEPARTAMENTO);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/proveedores/${id}`, {
            
            prv_nit,
            prv_razonsocial,
            prv_nombre,
            prv_nlocal,
            prv_calle,
            prv_zona,
            prv_avenida,
            prv_municipio,
            prv_departamento
        })
        .then(res => {
          console.log(res);
          Swal.fire({
              icon: "success",
              title: "Listo...",
              text: "Proveedor actualizado exitosamente!",
          }).then(() => {
              navigate('/proveedores');  
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
            <h3>Actualizar Proveedor</h3>
            
            <div className="mb-2">
              <label htmlFor="">NIT </label>
              <input
                type="text"
                className="form-control"
                value={prv_nit}
                onChange={(e) => setNit(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Razon Social</label>
              <input
                type="text"
                className="form-control"
                value={prv_razonsocial}
                onChange={(e) => setRazon(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Nombre Proveedor </label>
              <input
                type="text"
                className="form-control"
                value={prv_nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Numero de Local</label>
              <input
                type="text"
                className="form-control"
                value={prv_nlocal}
                onChange={(e) => setNlocal(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Calle </label>
              <input
                type="text"
                className="form-control"
                value={prv_calle}
                onChange={(e) => setCalle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Zona</label>
              <input
                type="text"
                className="form-control"
                value={prv_zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Avenida </label>
              <input
                type="text"
                className="form-control"
                value={prv_avenida}
                onChange={(e) => setAvenida(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Municipio</label>
              <input
                type="text"
                className="form-control"
                value={prv_municipio}
                onChange={(e) => setMunicipio(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Departamento </label>
              <input
                type="text"
                className="form-control"
                value={prv_departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end align-items-center gap-10">
              <button type="submit" href="/proveedores" className="btn btn-primary mb-2">Actualizar</button>
              <Link to="/proveedores" className="btn btn-danger mb-2">Regresar</Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ActualizarProveedor;
  