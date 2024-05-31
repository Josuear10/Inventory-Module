import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function ActualizarProducto() {
    const { id } = useParams();
    const [pro_id, setIdProducto] = useState('');
    const [pro_nombre, setNombreProducto] = useState('');
    const [pro_unidaddemedida, setUnidadDeMedida] = useState('');
    const [pro_descripcion, setDescripcion] = useState('');
    const [pro_cantidad, setCantidad] = useState('');
    const [pro_valor, setValor] = useState('');
    const [ofi_id, setOfiId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('ID del Producto:', id);
        // Fetch data for the specified product ID (id)
        axios.get(`http://localhost:6060/producto/${id}`)
            .then(res => {
                const data = res.data;
                setIdProducto(data.PRO_ID);
                setNombreProducto(data.PRO_NOMBRE);
                setUnidadDeMedida(data.PRO_UNIDADDEMEDIDA);
                setDescripcion(data.PRO_DESCRIPCION);
                setCantidad(data.PRO_CANTIDAD);
                setValor(data.PRO_VALOR);    
                setOfiId(data.OFI_ID) 
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:6060/producto/${id}`, {
            pro_id,
            pro_nombre,
            pro_unidaddemedida,
            pro_descripcion,
            pro_cantidad,
            pro_valor,
            ofi_id
        })
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "Listo...",
                    text: "Producto actualizado exitosamente!",
                }).then(() => {
                    navigate('/producto');  
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
                    <h3>Actualizar Producto</h3>
                    <div className="mb-2">
                        <label htmlFor="">Nombre Producto</label>
                        <input type="text" className="form-control" value={pro_nombre} onChange={e => setNombreProducto(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Unidad de Medida</label>
                        <input type="text" className="form-control" value={pro_unidaddemedida} onChange={e => setUnidadDeMedida(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Descripcion</label>
                        <input type="text" className="form-control" value={pro_descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="form-control" value={pro_cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Valor Unitario</label>
                        <input type="text" className="form-control" value={pro_valor} onChange={e => setValor(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ID Oficina</label>
                        <input type="text" className="form-control" value={ofi_id} onChange={e => setOfiId(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/producto" className="btn btn-primary mb-2">Actualizar</button>
                        <Link to="/producto" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


