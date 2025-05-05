import React, { useState } from "react";
import Styles from "../Components_Styles/Inventario.module.css";

function Add_Items_Button({ProductoID }) {
    const [Activate_Edit, Set_Activate_Dialog] = useState(false);
     const[Activar_Error,SetError]=useState(false)



    async function Actualizar_Data(event) {
        event.preventDefault();

        let Categoria=document.getElementById("Categoria").value;
        const IMG = document.getElementById("Imagen").files[0];
        let Producto = document.getElementById("Producto").value;
        let Codigo = document.getElementById("Codigo").value;
        let Descripcion = document.getElementById("Descripcion").value;
        let Cantidad = document.getElementById("Cantidad").value;
        let Precio = document.getElementById("Precio").value;

        if (!Producto || !Codigo || !Descripcion || !Cantidad || !Precio || !IMG || !Categoria) {
           alert("Los datos no pueden estar vacios")
            return;
        }


        const urlS = URL.createObjectURL(IMG);

        try {
            const response = await fetch("http://localhost:3000/Productos/Add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ProductoID,
                    Producto,
                    Codigo,
                    Descripcion,
                    Cantidad,
                    Precio,
                    Categoria,
                    imageUrl: urlS,
                }),
            });

            const data = await response.json();
            console.log(data);

            // Cerrar el diálogo después de actualizar
            Set_Activate_Dialog(false);

        } catch (error) {
            console.error(error);
        }
    }


    return(<>

    <button onClick={()=>Set_Activate_Dialog(true)}  className={Styles.Add_Items_Button}><i className="fa-solid fa-plus"></i></button>
    
    
    {Activate_Edit && (
                  <dialog className={Styles.Dialog_Inventory} open>
                      <h2>Actualizar Producto</h2> 
                      <div className={Styles.Div_Inventory_Inputs}>
                          <input type="text" placeholder="Nombre del producto" id="Producto" />


                        <div className={Styles.Div_Info_item}>
                        <input type="text" placeholder="Código del producto" id="Codigo" />
                        <input type="text" placeholder="Categoria" id="Categoria" />
                        </div>
                          <textarea id="Descripcion" placeholder="Descripción"></textarea>
  
                          <div className={Styles.Div_Money_div}>
                              <input type="number" placeholder="Cantidad" id="Cantidad" />
                              <input type="number" placeholder="Precio" id="Precio" />
                          </div>
  
                          <input type="file" id="Imagen"  />
                      </div>
  
                      <div className={Styles.Div_Optiones}>
                          <button onClick={() => Set_Activate_Dialog(false)}>Cancelar</button>
                          <button onClick={Actualizar_Data}>Guardar</button>
                      </div>
                  </dialog>
              )}

  </>)
}


export default Add_Items_Button
