import React, { useEffect, useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function TopProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    console.log('Realizando solicitud GET...');
    axios.get('http://localhost:6060/topproductos')
      .then(res => {
        console.log('Solicitud GET exitosa:', res);
        setProductos(res.data);
      })
      .catch(err => {
        console.log('Error en la solicitud GET:', err);
      });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Top Productos");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, 'top_productos.xlsx');
  };

  const exportToPDF = () => {
    const input = document.getElementById('tabla-top-productos');
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

      pdf.save('top_productos.pdf');
    });
  };

  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-white'>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 padding-top-25">Top 5 Productos Vendidos</h2>
        <div className='w-100 bg-white rounded p-3'>
          <div className="table-responsive">
            <table className='table table-striped' id='tabla-top-productos'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Total Vendidos</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((data, i) => (
                  <tr key={i}>
                    <td>{data.PRO_NOMBRE}</td>
                    <td>{data.TOTALVENDIDOS}</td>
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
  )
}
