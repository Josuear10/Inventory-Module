import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from  'sweetalert2';

export default function ActualizarEntrada() {
    const { id } = useParams();
    const [ent_id, setIdEntrada] = useState('');
    const [pro_id, setIdProducto] = useState('');
    const [ent_fechaentrada, setFechaEntrada] = useState('');
    const [ent_movimiento, setMovimiento] = useState('');
    const [ent_unidadmedida, setUnidadMedida] = useState('');
    const [ent_cantidad, setCantidad] = useState('');
    const [ent_preciosalida, setPrecioSalida] = useState('');
    const [prv_id, setPrvId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID de Entrada:', id);
        // Fetch data for the specified entrada ID (id)
        axios.get(`http://localhost:6060/entrada/${id}`)
            .then(res => {
                const data = res.data;
                setIdEntrada(data.ENT_ID);
                setIdProducto(data.PRO_ID);
                setFechaEntrada(data.ENT_FECHAENTRADA);
                setMovimiento(data.ENT_MOVIMIENTO);
                setUnidadMedida(data.ENT_UNIDADMEDIDA);
                setCantidad(data.ENT_CANTIDAD);
                setPrecioSalida(data.ENT_PRECIOSALIDA);
                setPrvId(data.PRV_ID)
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/entrada/${id}`, {
            ent_id,
            pro_id,
            ent_fechaentrada,
            ent_movimiento,
            ent_unidadmedida,
            ent_cantidad,
            ent_preciosalida,
            prv_id
        })
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Listo...",
                text: "Entrada actualizada exitosamente!",
            }).then(() => {
                navigate('/entrada');  
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
                    <h3>Actualizar Entrada</h3>
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" className="form-control" value={pro_id} onChange={e => setIdProducto(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fecha Entrada</label>
                        <input type="text" className="form-control" value={ent_fechaentrada} onChange={e => setFechaEntrada(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Movimiento</label>
                        <input type="text" className="form-control" value={ent_movimiento} onChange={e => setMovimiento(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Unidad de Medida</label>
                        <input type="text" className="form-control" value={ent_unidadmedida} onChange={e => setUnidadMedida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="form-control" value={ent_cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Precio Salida</label>
                        <input type="text" className="form-control" value={ent_preciosalida} onChange={e => setPrecioSalida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Proveedor</label>
                        <input type="text" className="form-control" value={prv_id} onChange={e => setPrvId(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/entrada" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/entrada" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
