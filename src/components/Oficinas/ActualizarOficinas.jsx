import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

  
function ActualizarOficinas() {
    const { id } = useParams();
    const [ofi_nombre, setNombre] = useState('');
    const [ofi_numero, setNumero] = useState('');
    const [ofi_calle, setCalle] = useState('');
    const [ofi_zona, setZona] = useState('');
    const [ofi_avenida, setAvenida] = useState('');
    const [ofi_municipio, setMunicipio] = useState('');
    const [ofi_departamento, setDepartamento] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID de la Oficina:', id);
        // Fetch data for the specified OFIent ID (id)
        axios.get(`http://localhost:6060/oficina/${id}`)
            .then(res => {
                const data = res.data;
                setNombre(data.OFI_NOMBRE);
                setNumero(data.OFI_NUMERO);
                setCalle(data.OFI_CALLE);
                setAvenida(data.OFI_AVENIDA);
                setZona(data.OFI_ZONA);
                setMunicipio(data.OFI_MUNICIPIO);
                setDepartamento(data.OFI_DEPARTAMENTO)
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/oficina/${id}`, {
            ofi_nombre,
            ofi_numero,
            ofi_calle,
            ofi_avenida,
            ofi_zona,
            ofi_municipio,
            ofi_departamento
        })
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Listo...",
                text: "Oficina actualizada exitosamente!",
            }).then(() => {
                navigate('/oficina');  
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
                    <h3>Actualizar Oficina</h3>
                   
                    <div className="mb-2">
                        <label htmlFor="">Nombre </label>
                        <input type="text" className="form-control" value={ofi_nombre} onChange={e => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numero</label>
                        <input type="text" className="form-control" value={ofi_numero} onChange={e => setNumero(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Calle</label>
                        <input type="text" className="form-control" value={ofi_calle} onChange={e => setCalle(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Avenida</label>
                        <input type="text" className="form-control" value={ofi_avenida} onChange={e => setAvenida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Zona</label>
                        <input type="text" className="form-control" value={ofi_zona} onChange={e => setZona(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Municipio</label>
                        <input type="text" className="form-control" value={ofi_municipio} onChange={e => setMunicipio(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Departamento</label>
                        <input type="text" className="form-control" value={ofi_departamento} onChange={e => setDepartamento(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/oficina" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/oficina" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActualizarOficinas;
  