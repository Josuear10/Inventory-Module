import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CrearDetalleProducto() {
    const [pro_id, setIdproducto] = useState('');
    const [dtp_nombrecategoria, setNombrecategoria] = useState('');
    const [dtp_categoria, setIdcategoria] = useState('');
    const [dtp_stockminimo, setStockminimo] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/detalleproducto', {
            pro_id,
            dtp_nombrecategoria,
            dtp_categoria,
            dtp_stockminimo
         })
         .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Creado...",
                text: "Detalle creado exitosamente!",
            }).then(() => {
                navigate('/detalleproducto');  
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
                <h3>Crear Detalle Producto</h3>
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" className="form-control" 
                        value={pro_id} onChange={e => setIdproducto(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Nombre Categoria</label>
                        <input type="text" className="form-control" 
                        value={dtp_nombrecategoria} onChange={e => setNombrecategoria(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Dpt. Categoria</label>
                        <input type="text" className="form-control" 
                        value={dtp_categoria} onChange={e => setIdcategoria(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Stock Minimo</label>
                        <input type="text" className="form-control" 
                        value={dtp_stockminimo} onChange={e => setStockminimo(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/detalleproducto" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/detalleproducto" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

