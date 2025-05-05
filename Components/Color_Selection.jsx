import React, { useState } from "react";
import Swich_Color from "../Components/Swich_Color.jsx";
import Styles from "../Components_Styles/HeaderStyles.module.css";
function  Color_Selection(params) {
     const[Activate_Filters,Set_Activate_Filters]=useState(false)

    return(
    <div className={Styles.Div_Header} >
    <h1>Inventario</h1> 
    <Swich_Color/>

    
    </div>
    
)
}

export default Color_Selection