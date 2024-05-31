import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function CrearProveedor() {
    
    const [prv_nit, setNit] = useState('');
    const [prv_razonsocial, setRazon] = useState('');
    const [prv_nombre, setNombre] = useState("");
    const [prv_nlocal, setNlocal] = useState("");
    const [prv_calle, setCalle] = useState("");
    const [prv_zona, setZona] = useState("");
    const [prv_avenida, setAvenida] = useState("");
    const [prv_municipio, setMunicipio] = useState("");
    const [prv_departamento, setDepartamento] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/proveedores', {  prv_nit, prv_razonsocial, prv_nombre,prv_nlocal, prv_calle, prv_zona, prv_avenida, prv_municipio, prv_departamento})
        .then(res => {
          console.log(res);
          Swal.fire({
              icon: "success",
              title: "Creado...",
              text: "Proveedor creado exitosamente!",
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
            <h3>Agregar proveedor</h3>

            <div className="mb-2">
              <label htmlFor="">NIT</label>
              <input
                type="text"
                placeholder="Ingrese el NIT del Proveedor"
                className="form-control"
                value={prv_nit}
                onChange={(e) => setNit(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Razon Social</label>
              <input
                type="text"
                placeholder="Ingrese la Razon Social del Proveedor"
                className="form-control"
                value={prv_razonsocial}
                onChange={(e) => setRazon(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                placeholder="Ingrese el Nombre del Proveedor"
                className="form-control"
                value={prv_nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Numero de local</label>
              <input
                type="text"
                placeholder="Ingrese el numero del local del Proveedor"
                className="form-control"
                value={prv_nlocal}
                onChange={(e) => setNlocal(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="">Calle</label>
              <input
                type="text"
                placeholder="Ingrese la calle del Proveedor"
                className="form-control"
                value={prv_calle}
                onChange={(e) => setCalle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Zona</label>
              <input
                type="text"
                placeholder="Ingrese la zona del Proveedor"
                className="form-control"
                value={prv_zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="">Avenida</label>
              <input
                type="text"
                placeholder="Ingrese la avenida del Proveedor"
                className="form-control"
                value={prv_avenida}
                onChange={(e) => setAvenida(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Municipio</label>
              <input
                type="text"
                placeholder="Ingrese el municipio del Proveedor"
                className="form-control"
                value={prv_municipio}
                onChange={(e) => setMunicipio(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Departamento</label>
              <input
                type="text"
                placeholder="Ingrese el departamento del Proveedor"
                className="form-control"
                value={prv_departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end align-items-center gap-10">
              <button type="submit" href="/proveedores" className="btn btn-success mb-2">Guardar</button>
              <Link to="/proveedores" className="btn btn-danger mb-2">Regresar</Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default CrearProveedor;
