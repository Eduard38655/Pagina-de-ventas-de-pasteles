import React, { useContext, useState } from "react";
import Export_Inventory from "../Components/Export_File.jsx";
import Styles from "../Components_Styles/Inventario.module.css";
import { MiContexto } from "../Context/Context.jsx";
import Delete_Items from "./Modification_Items/Delete_Button.jsx";
import Detalles_Items from "./Modification_Items/Detalles_Items.jsx";
import Edit_Items from "./Modification_Items/Edit_Item.jsx";
 

function  Items_Content({Productos} ) {
    const {mensaje, setMensaje} = useContext(MiContexto);
    const {MinPrice,SetMinPrice} = useContext(MiContexto);
    const {MaxPrice,SetMaxPrice}=useContext(MiContexto)
    const {SelectStuck,SetSelectStuck}=useContext(MiContexto)
    const {SelectCategoria,SetSelectCategoria}=useContext(MiContexto)
    const [resultado, setResultado] = useState(null);
 
 
 
 
    return( 
        <>
    <div className={Styles.Div_Table_Container}>   

    
 
  
   <table  className={Styles.Div_Items}>
      
    <thead>
        <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
     
    {Productos && Productos.length ? (
        Productos.map((Producto,index)=>(
 
            <tr key={index} id="Change">
                <td><img src={Producto.IMG} alt=""  /></td>
                <td>{Producto.Producto}</td>
                <td>{Producto.Codigo}</td>
                <td>{Producto.Cantidad}</td>
                <td>{Producto.Price}</td>
                <td>{Producto.Categoria}</td>
                <td>
               
                 <Detalles_Items ProductoID={Producto.ProductosID} />
               <Edit_Items ProductoID={Producto.ProductosID} />
               <Delete_Items ProductoID={Producto.ProductosID} />  
               
                 
               </td>
            </tr>
            
        ))

        ) : (<></>) }
    </tbody>
    
  



   </table>
 
 
</div>
 <Export_Inventory  data={Productos}/>
</>
)
}

export default Items_Content