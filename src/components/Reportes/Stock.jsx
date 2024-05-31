import React, { useEffect, useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Stock() {
    const [productStock, setProductStock] = useState([]);
    const [bodega, setBodega] = useState('');
    const [producto, setProducto] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        console.log('Realizando solicitud GET...');
        axios.get('http://localhost:6060/stock', {
            params: {
                bodega,
                producto,
                color
            }
        })
        .then(res => {
            console.log('Solicitud GET exitosa:', res);
            setProductStock(res.data);
        })
        .catch(err => {
            console.log('Error en la solicitud GET:', err);
        });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productStock);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ProductStock");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, 'ProductStock.xlsx');
    };

    const exportToPDF = () => {
        const input = document.getElementById('tabla-productstock');
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

            pdf.save('ProductStock.pdf');
        });
    };

    const getAlertStyle = (stock, stockMinimo) => {
        if (stock <= stockMinimo) {
            return { backgroundColor: 'red', color: 'white' };
        } else if (stock <= stockMinimo + 3) {
            return { backgroundColor: 'orange', color: 'white' };
        } else {
            return {};
        }
    };

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4 padding-top-25">Productos Disponibles</h2>
                <div className='w-100 bg-white rounded p-3'>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mx-2">
                            <label htmlFor="bodega">Bodega:</label>
                            <input 
                                type="text" 
                                id="bodega" 
                                value={bodega} 
                                onChange={e => setBodega(e.target.value)} 
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
                        <table className='table table-striped' id='tabla-productstock'>
                            <thead>
                                <tr>
                                    <th>Bodega</th>
                                    <th>Número de Teléfono</th>
                                    <th>Producto</th>
                                    <th>Stock</th>
                                    <th>Stock Mínimo</th>
                                    <th>Alerta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productStock.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.bodega}</td>
                                        <td>{data.numero_telefono}</td>
                                        <td>{data.producto}</td>
                                        <td>{data.stock}</td>
                                        <td>{data.stock_minimo}</td>
                                        <td style={getAlertStyle(data.stock, data.stock_minimo)}>
                                            {data.stock <= data.stock_minimo ? 'Comprar Producto' :
                                             (data.stock <= data.stock_minimo + 3 ? 'Pronto a llegar a Stock minimo' : 'Sin Alerta')}
                                        </td>
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
