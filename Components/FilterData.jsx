import React, { useContext, useState } from "react";
import More_Details_Search from "../Components/More_Details_Search.jsx";
import Styles from "../Components_Styles/Styles_Filter.module.css";
import { MiContexto } from "../Context/Context.jsx";


function  FilterData({Productos}) {

const[Activate_Filters,Set_Activate_Filters]=useState(false)
const[Search_Valor,Set_Search_Valor]=useState("")
const {mensaje, setMensaje} = useContext(MiContexto);
   
function SearchItem(e){
 
   
    setMensaje(e.target.value)
  

}

return(

    <>
   <div  className={Styles.Div_Filter}>
   <input onChange={SearchItem} id="Input_Valor" type="text" placeholder="Buscar productos por nombre, categoria o codigo"/>
  <button onClick={()=>Set_Activate_Filters( !Activate_Filters ? true :false)} ><i className="fa-solid fa-filter"></i> Filtros</button>
 
   </div>
 
  <More_Details_Search Activate_Filters={Activate_Filters} Productos={Productos}  />
    </>
)
}

export default FilterData