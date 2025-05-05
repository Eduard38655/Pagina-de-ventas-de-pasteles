import React, { useState } from "react";
import Styles from "../../Components_Styles/Delete_Dialog.module.css";


function Delete_Items({ProductoID}) {
    const[Activate_Dialog,SetDialog]=useState(false)
    
   async function Eliminar_Items_Info(params) {
 
      
        console.log(ProductoID);
      
        try {
          const response = await fetch("http://localhost:3000/Productos/Delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ProductoID}),
          });
      
          const data = await response.json();
          console.log(data);
          SetDialog(false)
        } catch (error) {
          alert(error);
        }
         
        
      
 
   }


return(<>
 <button onClick={()=>SetDialog(true)}><i className="fa-solid fa-trash"></i></button>


{Activate_Dialog ? (
<dialog className={Styles.Dialog_Delete_Container} >
<h3>Confirmar Eliminación</h3>
<p>¿Está seguro que desea eliminar este producto?</p>

<div>
    
<button onClick={()=>SetDialog(false)}>Cancelar</button>

 
<button onClick={ Eliminar_Items_Info }>Eliminar</button>

</div>
</dialog>



) :(<></>)}



</>)

}

export default  Delete_Items