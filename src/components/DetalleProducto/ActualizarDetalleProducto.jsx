import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ActualizarDetalleProducto() {
    const { id } = useParams();
    const [dtp_id, setIddetalle] = useState('');
    const [pro_id, setIdproducto] = useState('');
    const [dtp_nombrecategoria, setNombrecategoria] = useState('');
    const [dtp_categoria, setIdcategoria] = useState('');
    const [dtp_stockminimo, setStockminimo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID del detalle:', id);
        axios.get(`http://localhost:6060/detalleproducto/${id}`)
            .then(res => {
                const data = res.data;
                setIddetalle(data.dtp_id);
                setIdproducto(data.PRO_ID);
                setNombrecategoria(data.DTP_NOMBRECATEGORIA);
                setIdcategoria(data.DTP_CATEGORIA);
                setStockminimo(data.DTP_STOCKMINIMO);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/detalleproducto/${id}`, {
            dtp_id,
            pro_id,
            dtp_nombrecategoria,
            dtp_categoria,
            dtp_stockminimo
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
                    <h3>Actualizar Detalle Producto</h3>
                    <div className="mb-2">
                        <label htmlFor="">ID_PRODUCTO</label>
                        <input type="text" className="form-control" value={pro_id} onChange={e => setIdproducto(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Nombre Detalle producto</label>
                        <input type="text" className="form-control" value={dtp_nombrecategoria} onChange={e => setNombrecategoria(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Categoria</label>
                        <input type="text" className="form-control" value={dtp_categoria} onChange={e => setIdcategoria(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Stock Minimo</label>
                        <input type="text" className="form-control" value={dtp_stockminimo} onChange={e => setStockminimo(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/detalleproducto" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/detalleproducto" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


