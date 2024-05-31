import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CrearOrden() {
    const [ord_id] = useState('');
    const [tra_id] = useState('');
    const [ofi_id, setId] = useState('');
    const [ord_fecha, setFecha] = useState('');
    const [ord_cantidad, setCantidad] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/ordenes', {  ord_id, tra_id, ofi_id, ord_fecha, ord_cantidad})
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Creado...",
                text: "Orden creada exitosamente!",
            }).then(() => {
                navigate('/ordenes');  
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
                    <h3>Agregar Orden</h3>
        
                    <div className="mb-2">
                        <label htmlFor="">Oficina ID</label>
                        <input type="text" placeholder="Ingrese la oficina " className="form-control"
                        value={ofi_id} onChange={e=> setId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fecha</label>
                        <input type="text" placeholder="Ingrese la fecha" className="form-control"
                        value={ord_fecha} onChange={e=> setFecha(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" placeholder="Ingrese la cantidad" className="form-control"
                        value={ord_cantidad} onChange={e=> setCantidad(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/ordenes" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/ordenes" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


