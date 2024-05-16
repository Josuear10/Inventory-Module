import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CrearEmpleados() {
    const [emp_primernombre, setPrimernombre] = useState('');
    const [emp_segundonombre, setSegundonombre] = useState('');
    const [emp_primerapellido, setPrimerapellido] = useState('');
    const [emp_segundoapellido, setSegundoapellido] = useState('');
    const [emp_puesto, setPuesto] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:6060/empleados', {
            emp_primernombre,
            emp_segundonombre,
            emp_primerapellido,
            emp_segundoapellido,
            emp_puesto
         })
        .then(res => {
            console.log(res);
            navigate('/');  
        }).catch(err => console.log(err));
    }

    return (
        <div className="d-flex bg-white justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                <h3>Crear Empleado</h3>
                    <div className="mb-2">
                        <label htmlFor="">Primer Nombre</label>
                        <input type="text" className="form-control" 
                        value={emp_primernombre} onChange={e => setPrimernombre(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Segundo Nombre</label>
                        <input type="text" className="form-control" 
                        value={emp_segundonombre} onChange={e => setSegundonombre(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Primer Apellido</label>
                        <input type="text" className="form-control" 
                        value={emp_primerapellido} onChange={e => setPrimerapellido(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Segundo Apellido</label>
                        <input type="text" className="form-control" 
                        value={emp_segundoapellido} onChange={e => setSegundoapellido(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Puesto</label>
                        <input type="text" className="form-control" 
                        value={emp_puesto} onChange={e => setPuesto(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end align-items-center gap-10">
                        <button type="submit" href="/empleados" className="btn btn-success mb-2">Guardar</button>
                        <Link to="/empleados" className="btn btn-danger mb-2">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearEmpleados;
