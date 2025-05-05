import React, { useContext, useEffect, useState } from 'react';
import Color_Selection from '../components/Color_Selection.jsx';
import FilterData from "../Components/FilterData.jsx";
import Items_Content from "../Components/Items_Content.jsx";
import Add_Items_Button from '../components/New_Items.jsx';
import { MiContexto } from "../Context/Context.jsx";
import Styles from '../pages_styles/MainPage.module.css';

function MainPage() {
  const [Productos, SetProductos] = useState([]);
  const [Reset, SetReset] = useState([]);

  // Desestructuramos el contexto una sola vez
  const {
    mensaje,
    MinPrice,
    MaxPrice,
    SetMaxPrice,
    SelectStuck,
    SetSelectStuck,
    SelectCategoria,
    SetSelectCategoria,
    DataBase_Productos,
    Set_DataBase_Productos
  } = useContext(MiContexto);

  // Obtener los productos del backend al cargar la página
  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch('http://localhost:3000/Productos/Inventario', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        SetProductos(data.data);
        SetReset(data.data);
        Set_DataBase_Productos(data.data)

      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    }
    if(Productos.length===0){
      SetProductos(["no hay valor"])
    }
    fetchProductos();
  }, []);

  // Filtros en base a búsqueda por nombre y rango de precio
  useEffect(() => {
    let filtrados = [...Reset];

    if (mensaje !== "") {
      filtrados = filtrados.filter(item =>
        item.Producto?.toLowerCase().startsWith(mensaje.toLowerCase())
      );
    }

    if (MinPrice !== "") {
      filtrados = filtrados.filter(item =>
        parseFloat(item.Price) <= parseFloat(MinPrice)
      );
    }

    if (MaxPrice !== "") {
      filtrados = filtrados.filter(item =>
        parseFloat(item.Price) >= parseFloat(MaxPrice)
      );
    }

    if (SelectCategoria !== "") {
      filtrados = filtrados.filter(item =>
        item.Categoria== SelectCategoria
      );
    }

 if (SelectStuck !== "") {
      filtrados = filtrados.filter(item =>
        item.Status == SelectStuck
      );
    } 
    
    
    SetProductos(filtrados);
  }, [mensaje, MinPrice, MaxPrice, Reset,SelectStuck,SelectCategoria,]);

  return (
    <div className={Styles.over}>
      <article className={Styles.Div_All_Container}>
        <Color_Selection />
        {Productos ? (
          <>
          <FilterData Productos={Productos}   />
          <Items_Content Productos={Productos} />
          </>
          ) : (<></>)}
        <Add_Items_Button />
      </article>
    </div>
  );
}

export default MainPage;
