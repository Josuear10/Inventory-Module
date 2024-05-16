import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
  
export default function ActualizarDetalleOrden() {
    const { id } = useParams();
    const [dto_id, setDtoId] = useState('');
    const [ord_id, setOrdId] = useState('');
    const [pro_id, setProId] = useState('');
    const [dto_grantotal, setDtoGranTotal] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        console.log('ID de la Orden:', id);
        // Fetch data for the specified OFIent ID (id)
        axios.get(`http://localhost:6060/detalleorden/${id}`)
            .then(res => {
                const data = res.data;
                setDtoId(data.DTO_ID);
                setOrdId(data.ORD_ID);
                setProId(data.PRO_ID);
                setDtoGranTotal(data.DTO_GRANTOTAL);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/detalleorden/${id}`, {
            dto_id,
            ord_id,
            pro_id,
            dto_grantotal,
        })
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
}

return (
  <div className="d-flex bg-white justify-content-center align-items-center">
    <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3>Actualizar Detalle Órden</h3>
                   
                    <div className="mb-2">
                        <label htmlFor="">ID Departamento</label>
                        <input type="text" className="form-control" value={dto_id} readonly="readonly"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Orden</label>
                        <input type="text" className="form-control" value={ord_id} onChange={e => setOrdId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" className="form-control" value={pro_id} onChange={e => setProId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Total Departamento</label>
                        <input type="text" className="form-control" value={dto_grantotal} onChange={e => setDtoGranTotal(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/detalleorden" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/detalleorden" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

  