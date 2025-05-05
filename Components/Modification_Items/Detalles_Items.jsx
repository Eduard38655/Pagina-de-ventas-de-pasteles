import React, { useState } from "react";
import Styles from "../../Components_Styles/Detalles_Items.module.css";

function Detalles_Items({ ProductoID }) {
  const [Ver_Detalles, SetDetalles] = useState([]);
  const [Activated_Dialog, SetDialog] = useState(false);

  async function VerDetalles() {
    SetDialog(true);

    try {
      const response = await fetch("http://localhost:3000/Productos/VerDetalles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ProductoID })
      });

      const data = await response.json();
      SetDetalles(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button onClick={VerDetalles}>
        <i className="fa-solid fa-eye"></i>
      </button>

      {Activated_Dialog &&
        Ver_Detalles.map((items, index) => (
          <dialog key={index} className={Styles.Div_Aialog_Detalles} open>
            <h2>Detalles del Producto</h2>
            <img src={items.IMG} alt="" />
            
            <div>
              <p><span>Nombre:</span><br />{items.Producto}</p>
              <p><span>Precio:</span><br />{items.Price}</p>
              <p><span>Código:</span><br />{items.Codigo}</p>
              <p><span>Cantidad:</span><br />{items.Cantidad}</p>
              <p>
                <span>Fecha de Agregado:</span><br />
                {new Date(items.Fecha).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </p>
              <p><span>Categoría:</span><br />{items.Categoria}</p>
            </div>

            <input
              type="button"
              value="Cancelar"
              className={Styles.Button_Detalles}
              onClick={() => SetDialog(false)}
            />
          </dialog>
        ))}
    </>
  );
}

export default Detalles_Items;
