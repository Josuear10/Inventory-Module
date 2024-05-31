import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';


export default function CrearDetalleOrden() {
    const [dto_id, setDtoId] = useState('');
    const [ord_id, setOrdId] = useState('');
    const [pro_id, setProId] = useState('');
    const [dto_grantotal, setDtoGranTotal] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/detalleorden', { dto_id, ord_id, pro_id, dto_grantotal})
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Creado...",
                text: "Detalle creado exitosamente!",
            }).then(() => {
                navigate('/detalleorden');  
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
                    <h3>Agregar Detalle Órden</h3>
                    
                    <div className="mb-2">
                        <label htmlFor="">ID Departamento</label>
                        <input type="text" placeholder="Ingrese el ID del departamento." className="form-control"
                        value={dto_id} onChange={e=> setDtoId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Orden</label>
                        <input type="text" placeholder="Ingrese ID de Orden." className="form-control"
                        value={ord_id} onChange={e=> setOrdId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" placeholder="Ingrese ID producto." className="form-control"
                        value={pro_id} onChange={e=> setProId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Total Departamento</label>
                        <input type="text" placeholder="Ingrese total departamento." className="form-control"
                        value={dto_grantotal} onChange={e=> setDtoGranTotal(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/detalleorden" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/detalleorden" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


