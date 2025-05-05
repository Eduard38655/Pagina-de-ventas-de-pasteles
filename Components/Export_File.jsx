import React from "react";
import Styles from "../Components_Styles/Inventario.module.css";

function Export_Inventory({ data }) {
  const handleExportCSV = () => {
    if (!data || data.length === 0) return;

    // 1. Extraer encabezados desde las claves del primer objeto
    const headers = Object.keys(data[0]).join(",");

    // 2. Crear las filas
    const rows = data.map(row =>
      Object.values(row)
        .map(val => `"${val}"`) // Maneja comas y textos con comillas
        .join(",")
    );

    // 3. Juntar encabezado y filas
    const csvContent = [headers, ...rows].join("\n");

    // 4. Crear Blob y disparar descarga
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventario.csv");
    link.click();
  };

  return (
    <button className={Styles.ExportButton} onClick={handleExportCSV}>
      <i className="fa-solid fa-download"></i> Exportar CSV
    </button>
  );
}

export default Export_Inventory;
