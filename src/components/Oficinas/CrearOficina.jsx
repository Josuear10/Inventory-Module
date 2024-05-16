import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CrearOficina() {
    const [ofi_numero, setNumero] = useState('');
    const [ofi_nombre, setNombre] = useState('');
    const [ofi_calle, setCalle] = useState('');
    const [ofi_zona, setZona] = useState('');
    const [ofi_avenida, setAvenida] = useState('');
    const [ofi_municipio, setMunicipio] = useState('');
    const [ofi_departamento, setDepartamento] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/oficina', {  ofi_nombre, ofi_numero, ofi_calle, ofi_zona, ofi_avenida, ofi_municipio, ofi_departamento})
        .then(res => {
            console.log(res);
            navigate('/');  
        }).catch(err => console.log(err));
    }

    return (
        <div className="d-flex bg-white justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3>Agregar Oficina</h3>
                    
                    <div className="mb-2">
                        <label htmlFor="">Nombre de la oficina</label>
                        <input type="text" placeholder="Ingrese Nombre de oficina" className="form-control"
                        value={ofi_nombre} onChange={e=> setNombre(e.target.value)} /> 
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numero de la oficina</label>
                        <input type="text" placeholder="Ingrese el numero de la oficina" className="form-control"
                        value={ofi_numero} onChange={e=> setNumero(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numero de calle</label>
                        <input type="text" placeholder="Ingrese la calle " className="form-control"
                        value={ofi_calle} onChange={e=> setCalle(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Zona</label>
                        <input type="text" placeholder="Ingrese la avenida" className="form-control"
                        value={ofi_avenida} onChange={e=> setAvenida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Avenida</label>
                        <input type="text" placeholder="Ingrese la zona" className="form-control"
                        value={ofi_zona} onChange={e=> setZona(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Municipio</label>
                        <input type="text" placeholder="Ingrese el municipio" className="form-control"
                        value={ofi_municipio} onChange={e=> setMunicipio(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Departamento</label>
                        <input type="text" placeholder="Ingrese el departamento" className="form-control"
                        value={ofi_departamento} onChange={e=> setDepartamento(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/oficina" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/oficina" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearOficina;
