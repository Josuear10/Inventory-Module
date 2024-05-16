import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function ActualizarCliente() {
    const { id } = useParams();
    const [cli_id, setIdcliente] = useState('');
    const [cli_nit, setNit] = useState('');
    const [cli_primernombre, setPrimernombre] = useState('');
    const [cli_segundonombre, setSegundonombre] = useState('');
    const [cli_primerapellido, sePrimerapellido] = useState('');
    const [cli_segundoapellido, setSegundoapellido] = useState('');
    const [cli_departamento, setDepartamento] = useState('');
    const [cli_municipio, setMunicipio] = useState('');
    const [cli_casa, setCasa] = useState('');
    const [cli_calle, setCalle] = useState('');
    const [cli_avenida, setAvenida] = useState('');
    const [cli_zona, setZona] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID del cliente:', id);
        // Fetch data for the specified client ID (id)
        axios.get(`http://localhost:6060/cliente/${id}`)
            .then(res => {
                const data = res.data;
                setIdcliente(data.cli_id);
                setNit(data.CLI_NIT);
                setPrimernombre(data.CLI_PRIMERNOMBRE);
                setSegundonombre(data.CLI_SEGUNDONOMBRE);
                sePrimerapellido(data.CLI_PRIMERAPELLIDO);
                setSegundoapellido(data.CLI_SEGUNDOAPELLIDO);
                setDepartamento(data.CLI_DEPARTAMENTO);
                setMunicipio(data.CLI_MUNICIPIO);
                setCasa(data.CLI_NCASA);
                setCalle(data.CLI_CALLE)
                setAvenida(data.CLI_AVENIDA);
                setZona(data.CLI_ZONA);
                
                
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/cliente/${id}`, {
            cli_id,
            cli_nit,
            cli_primernombre,
            cli_segundonombre,
            cli_primerapellido,
            cli_segundoapellido,
            cli_departamento,
            cli_municipio,
            cli_casa,
            cli_calle,
            cli_avenida,
            cli_zona 
        })
            .then(res => {
                console.log(res);
                // REVISAR RUTA
                navigate('/cliente'); 
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex bg-white justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3>Actualizar Cliente</h3>
                    <div className="mb-2">
                        <label htmlFor="">NIT</label>
                        <input type="text" className="form-control" value={cli_nit} onChange={e => setNit(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Primer Nombre</label>
                        <input type="text" className="form-control" value={cli_primernombre} onChange={e => setPrimernombre(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Segundo Nombre</label>
                        <input type="text" className="form-control" value={cli_segundonombre} onChange={e => setSegundonombre(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Primer Apellido</label>
                        <input type="text" className="form-control" value={cli_primerapellido} onChange={e => sePrimerapellido(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Segundo Apellido</label>
                        <input type="text" className="form-control" value={cli_segundoapellido} onChange={e => setSegundoapellido(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Departamento</label>
                        <input type="text" className="form-control" value={cli_departamento} onChange={e => setDepartamento(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Municipio</label>
                        <input type="text" className="form-control" value={cli_municipio} onChange={e => setMunicipio(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">No. Casa</label>
                        <input type="text" className="form-control" value={cli_casa} onChange={e => setCasa(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Calle</label>
                        <input type="text" className="form-control" value={cli_calle} onChange={e => setCalle(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Avenida</label>
                        <input type="text" className="form-control" value={cli_avenida} onChange={e => setAvenida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Zona</label>
                        <input type="text" className="form-control" value={cli_zona} onChange={e => setZona(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/cliente" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/cliente" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActualizarCliente;
