import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

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
        {  pro_id, ent_fechaentrada, ent_movimiento, ent_unidadmedida, ent_cantidad, ent_preciosalida, prv_id })
        .then(res => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Creado...",
                text: "Entrada creada exitosamente!",
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
        <div className="d-flex bg-white justify-content-center align-items-center vh-100">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3>Agregar Entrada</h3>
                    
                    <div className="mb-2">
                        <label htmlFor="pro_id">ID Producto</label>
                        <input
                            type="text"
                            id="pro_id"
                            placeholder="Ingrese el ID de su Producto."
                            className="form-control"
                            value={pro_id}
                            onChange={e => setIdProducto(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ent_fechaentrada">Fecha Entrada</label>
                        <input
                            type="date"
                            id="ent_fechaentrada"
                            className="form-control"
                            value={ent_fechaentrada}
                            onChange={e => setFechaEntrada(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ent_movimiento">Movimiento</label>
                        <select
                            id="ent_movimiento"
                            className="form-control"
                            value={ent_movimiento}
                            onChange={e => setMovimiento(e.target.value)}
                        >
                            <option value="">Seleccione un movimiento</option>
                            <option value="1">1. Compra</option>
                            <option value="2">2. Devolucion sobre ventas </option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ent_unidadmedida">Unidad de Medida</label>
                        <input
                            type="text"
                            id="ent_unidadmedida"
                            placeholder="Ingrese unidad de medida."
                            className="form-control"
                            value={ent_unidadmedida}
                            onChange={e => setUnidadMedida(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ent_cantidad">Cantidad</label>
                        <input
                            type="text"
                            id="ent_cantidad"
                            placeholder="Ingrese cantidad"
                            className="form-control"
                            value={ent_cantidad}
                            onChange={e => setCantidad(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="ent_preciosalida">Precio Salida</label>
                        <input
                            type="text"
                            id="ent_preciosalida"
                            placeholder="Ingrese precio de salida."
                            className="form-control"
                            value={ent_preciosalida}
                            onChange={e => setPrecioSalida(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="prv_id">ID Proveedor</label>
                        <input
                            type="text"
                            id="prv_id"
                            placeholder="Ingrese ID de Proveedor"
                            className="form-control"
                            value={prv_id}
                            onChange={e => setPrvId(e.target.value)}
                        />
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <button type="submit" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/entrada" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
