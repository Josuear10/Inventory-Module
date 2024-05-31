import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

export default function ActualizarOrden() {
    const { id } = useParams();
    const [tra_id, setTid] = useState('');
    const [ofi_id, setId] = useState('');
    const [ord_fecha, setFecha] = useState('');
    const [ord_cantidad, setCantidad] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        console.log('ID de la Orden:', id);
        // Fetch data for the specified OFIent ID (id)
        axios.get(`http://localhost:6060/ordenes/${id}`)
            .then(res => {
                const data = res.data;
                setTid(data.TRA_ID);
                setId(data.OFI_ID);
                setFecha(data.ORD_FECHA);
                setCantidad(data.ORD_CANTIDAD);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/ordenes/${id}`, {
            tra_id,
            ofi_id,
            ord_fecha,
            ord_cantidad,
        })
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Listo...",
                text: "Orden actualizada exitosamente!",
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
                    <h3>Actualizar Órden</h3>
                   
                    <div className="mb-2">
                        <label htmlFor="">Tra id</label>
                        <input type="text" className="form-control" value={tra_id} readonly="readonly" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Oficina Id</label>
                        <input type="text" className="form-control" value={ofi_id} onChange={e => setId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fecha</label>
                        <input type="text" className="form-control" value={ord_fecha} onChange={e => setFecha(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="form-control" value={ord_cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/ordenes" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/ordenes" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

  