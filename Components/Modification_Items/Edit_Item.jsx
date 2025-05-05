import React, { useState } from "react";
import Styles from "../../Components_Styles/Inventory_Dialog.module.css";

function Edit_Items({ ProductoID }) {
    const [Activate_Edit, Set_Activate_Dialog] = useState(false);

    async function Actualizar_Data(event) {
        event.preventDefault();

        const IMG = document.getElementById("Imagen").files[0];
        let Producto = document.getElementById("Producto").value;
        let Codigo = document.getElementById("Codigo").value;
        let Descripcion = document.getElementById("Descripcion").value;
        let Cantidad = document.getElementById("Cantidad").value;
        let Precio = document.getElementById("Precio").value;

        
        if (!Producto || !Codigo || !Descripcion || !Cantidad || !Precio || !IMG) {
            alert("Los datos no pueden estar vacios")
            return;
        }

        const urlS = URL.createObjectURL(IMG);

        try {
            const response = await fetch("http://localhost:3000/Productos/Update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ProductoID,
                    Producto,
                    Codigo,
                    Descripcion,
                    Cantidad,
                    Precio,
                    imageUrl: urlS,
                }),
            });

            const data = await response.json();
            console.log(data);

            // Cerrar el diálogo después de actualizar
            Set_Activate_Dialog(false);

        } catch (error) {
            alert(error);
             
        }
    }

    return (
        <>
            <button onClick={() => Set_Activate_Dialog(true)}>
                <i className="fa-solid fa-pen"></i>
            </button>

            {Activate_Edit && (
                <dialog className={Styles.Dialog_Inventory} open>
                    <h2>Actualizar Producto</h2> 
                    <div className={Styles.Div_Inventory_Inputs}>
                        <input type="text" placeholder="Nombre del producto" id="Producto" />
                        <input type="text" placeholder="Código del producto" id="Codigo" />
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
        </>
    );
}

export default Edit_Items;
