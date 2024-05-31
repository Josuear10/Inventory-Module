import React, { useEffect, useState } from "react";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function KardexReport() {
    const [kardex, setKardex] = useState([]);
    const [producto, setProducto] = useState('');

    const handleFilter = async () => {
        try {
            const response = await axios.get('http://localhost:6060/kardex', {
                params: { producto }
            });
            setKardex(response.data);
        } catch (err) {
            console.log('Error en la solicitud GET:', err);
        }
    };

    useEffect(() => {
        handleFilter();
    }, []);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(kardex);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Kardex");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, 'kardex.xlsx');
    };

    const exportToPDF = () => {
        const input = document.getElementById('kardex-table');
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

            pdf.save('kardex.pdf');
        });
    };

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4 padding-top-25">KARDEX</h2>
                <div className='w-100 bg-white rounded p-3'>
                    <div className="d-flex justify-content-center mb-3" style={{ gap: '1cm' }}>
                        <div>
                            <label htmlFor="producto">Nombre del Producto</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="producto" 
                                value={producto} 
                                onChange={(e) => setProducto(e.target.value)} 
                            />
                        </div>
                        <div className="d-flex align-items-end">
                            <button onClick={handleFilter} className='btn btn-primary'>Filtrar</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className='table table-striped' id='kardex-table'>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Producto</th>
                                    <th>Entrada</th>
                                    <th>Salida</th>
                                    <th>Serie</th>
                                    <th>Nfel</th>
                                    <th>Proveedor/Cliente</th>
                                    <th>Existencias</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kardex.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.fecha}</td>
                                        <td>{data.producto}</td>
                                        <td>{data.entrada}</td>
                                        <td>{data.salida}</td>
                                        <td>{data.serie}</td>
                                        <td>{data.nfel}</td>
                                        <td>{data.proveedor_cliente}</td>
                                        <td>{data.saldo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center w-100" style={{ gap: '2cm' }}>
                        <button onClick={exportToExcel} className='btn btn-success mb-3'>Descargar Excel</button>
                        <button onClick={exportToPDF} className='btn btn-danger mb-3'>Descargar PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
