import React, { useEffect, useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReporteEntrada() {
    const [entrada, setEntrada] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [producto, setProducto] = useState('');

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/rentrada', {
            params: {
                fechaInicio,
                fechaFin,
                proveedor,
                producto
            }
        })
            .then(res => {
                console.log('Solicitud GET exitosa:', res);
                setEntrada(res.data);
            })
            .catch(err => {
                console.log('Error en la solicitud GET:', err);
            });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(entrada);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Entradas");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, 'entradas.xlsx');
    };

    const exportToPDF = () => {
        const input = document.getElementById('tabla-entradas');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; 
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 10; 

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('entradas.pdf');
        });
    };

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4 padding-top-25">Reporte Entradas</h2>
                <div className='w-100 bg-white rounded p-3'>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mx-2">
                            <label htmlFor="fechaInicio">Fecha Inicio:</label>
                            <input 
                                type="date" 
                                id="fechaInicio" 
                                value={fechaInicio} 
                                onChange={e => setFechaInicio(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center mx-2">
                            <label htmlFor="fechaFin">Fecha Fin:</label>
                            <input 
                                type="date" 
                                id="fechaFin" 
                                value={fechaFin} 
                                onChange={e => setFechaFin(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center mx-2">
                            <label htmlFor="proveedor">Proveedor:</label>
                            <input 
                                type="text" 
                                id="proveedor" 
                                value={proveedor} 
                                onChange={e => setProveedor(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center mx-2">
                            <label htmlFor="producto">Producto:</label>
                            <input 
                                type="text" 
                                id="producto" 
                                value={producto} 
                                onChange={e => setProducto(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        <button onClick={obtenerDatos} className='btn btn-primary align-self-end mx-2'>Filtrar</button>
                    </div>
                    <div className="table-responsive">
                        <table className='table table-striped' id='tabla-entradas'>
                            <thead>
                                <tr>
                                    <th>ID entrada</th>
                                    <th>Producto</th>
                                    <th>Fecha Entrada</th>
                                    <th>Movimiento</th>
                                    <th>Unidad de Medida</th>
                                    <th>Cantidad</th>
                                    <th>Precio Salida</th>
                                    <th>Proveedor</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {entrada.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.ENT_ID}</td>
                                        <td>{data.PRO_NOMBRE}</td>
                                        <td>{data.ENT_FECHAENTRADA}</td>
                                        <td>{data.MOVIMIENTO}</td>
                                        <td>{data.ENT_UNIDADMEDIDA}</td>
                                        <td>{data.ENT_CANTIDAD}</td>
                                        <td>{data.ENT_PRECIOSALIDA}</td>
                                        <td>{data.PRV_NOMBRE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center w-100" style={{ gap: '2cm' }}>
                        <button onClick={exportToExcel} className='btn btn-success mb-3'>Descargar Excel</button>
                        <button onClick={exportToPDF} className='btn btn-danger mb-3'>Descargar PDF</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
