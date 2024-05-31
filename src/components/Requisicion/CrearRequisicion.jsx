import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

function CrearRequisicion() {
    const [req_fecha, setFecha] = useState('');
    const [pro_id, setIdproducto] = useState('');
    const [req_cantidad, setCantidad] = useState('');
    const [emp_id, setIdempleado] = useState('');
    const [ofi_id, setIdoficina] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/requisicion', {
            req_fecha,
            pro_id,
            req_cantidad,
            emp_id,
            ofi_id
         })
         .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Creado...",
                text: "Requisicion creada exitosamente!",
            }).then(() => {
                navigate('/requisicion');  
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
                <h3>Crear Requisicion</h3>
                    <div className="mb-2">
                        <label htmlFor="">Fecha</label>
                        <input type="text" className="form-control" 
                        value={req_fecha} onChange={e => setFecha(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" className="form-control" 
                        value={pro_id} onChange={e => setIdproducto(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="form-control" 
                        value={req_cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Empleado</label>
                        <input type="text" className="form-control" 
                        value={emp_id} onChange={e => setIdempleado(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Oficina</label>
                        <input type="text" className="form-control" 
                        value={ofi_id} onChange={e => setIdoficina(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/requisicion" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/requisicion" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearRequisicion;
