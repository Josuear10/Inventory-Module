import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CrearEntrada() {
    
    // const [ent_id, setIdEntrada] = useState('');
    const [pro_id, setIdProducto] = useState('');
    const [ent_fechaentrada, setFechaEntrada] = useState('');
    const [ent_movimiento, setMovimiento] = useState('');
    const [ent_unidadmedida, setUnidadMedida] = useState('');
    const [ent_cantidad, setCantidad] = useState('');
    const [ent_preciosalida, setPrecioSalida] = useState('');
    const [prv_id, setPrvId] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/entrada', 
        {  ent_fechaentrada, ent_movimiento, ent_unidadmedida, ent_cantidad, ent_preciosalida, prv_id })
        .then(res => {
            console.log(res);
            navigate('/');  
        }).catch(err => console.log(err));
    }

    return (
        <div className="d-flex bg-white justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3>Agregar Entrada</h3>
                    
                    <div className="mb-2">
                        <label htmlFor="">ID Producto</label>
                        <input type="text" placeholder="Ingrese el ID de su Producto." className="form-control"
                        value={pro_id} onChange={e=> setIdProducto(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Fecha Entrada</label>
                        <input type="text" placeholder="Ingrese fecha de entrada. (Entrada)" className="form-control"
                        value={ent_fechaentrada} onChange={e=> setFechaEntrada(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Movimiento</label>
                        <input type="text" placeholder="Ingrese tipo de movimiento. (Entrada)" className="form-control"
                        value={ent_movimiento} onChange={e=> setMovimiento(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Unidad de Medida</label>
                        <input type="text" placeholder="Ingrese unidad de medida." className="form-control"
                        value={ent_unidadmedida} onChange={e=> setUnidadMedida(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" placeholder="Ingrese cantidad" className="form-control"
                        value={ent_cantidad} onChange={e=> setCantidad(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Precio Salida</label>
                        <input type="text" placeholder="Ingrese precio de salida. " className="form-control"
                        value={ent_preciosalida} onChange={e=> setPrecioSalida(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">ID Proveedor</label>
                        <input type="text" placeholder="Ingrese ID de Proveedor" className="form-control"
                        value={prv_id} onChange={e=> setPrvId(e.target.value)} />
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/producto" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/entrada" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
