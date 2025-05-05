import React, { useContext } from "react";
import Styles from "../Components_Styles/Styles_Filter.module.css";
import { MiContexto } from "../Context/Context.jsx";

function  More_Details_Search({Activate_Filters,Productos }) {
 const {mensaje,setMensaje} = useContext(MiContexto);
 const { MinPrice,SetMinPrice} = useContext(MiContexto);
 const { MaxPrice,SetMaxPrice} = useContext(MiContexto);
 const { SelectStuck,SetSelectStuck} = useContext(MiContexto);
 const { SelectCategoria,SetSelectCategoria} = useContext(MiContexto);
 const { DataBase_Productos,Set_DataBase_Productos} = useContext(MiContexto);


function MinPrice_Items(e){SetMinPrice(e.target.value)}
function MaxPrice_Items(e){SetMaxPrice(e.target.value)}



function SelectStuck_Items(e){
  if (e.target.value==="Disponibilidad") {
    SetSelectStuck(DataBase_Productos)
  } else {
    SetSelectStuck(e.target.value)
  }
}

function SelectCategoria_Items(e){

  if (e.target.value==="Categoria") {
    SetSelectCategoria(DataBase_Productos)
  } else {
    SetSelectCategoria(e.target.value)
  }

}


 

    return(
    <>  
    {Activate_Filters ?(
    <aside className={Styles.Div_More_Container} >

   <select name="" id="" onChange={SelectCategoria_Items}>
    <option value="">Categoria</option>

  {DataBase_Productos.map((items,index)=>(
    <option key={index} value={items.Categoria}>{items.Categoria}</option>
        
    )) }
    
    
    </select>
   
   <div className={Styles.Div_Quantity}>
   <input type="number" name="" id=""  placeholder="Precio Min" onChange={MinPrice_Items}/>
   <input type="number" name="" id="" placeholder="Precio Max" onChange={MaxPrice_Items}  />
   </div>
   
   <select name="" id=""   onChange={SelectStuck_Items}>
     <option value="">Disponibilidad</option>

    {DataBase_Productos.map((items,index)=>(
      <option key={index} value={items.Status}>{items.Status}</option>
        
    )) 
    
  }
    
    </select>

</aside>
) : (<></>)}


    </>
)
}

export default  More_Details_Search