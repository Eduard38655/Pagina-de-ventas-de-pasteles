// Context.jsx
import React, { createContext, useState } from 'react';

export const MiContexto = createContext();

const AppProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState("");  // Verifica que 'mensaje' esté siendo configurado correctamente
  const [MinPrice,SetMinPrice]=useState("")
  const [MaxPrice,SetMaxPrice]=useState("")
  const [SelectStuck,SetSelectStuck]=useState("")
  const [SelectCategoria,SetSelectCategoria]=useState("")
  const [DataBase_Productos,Set_DataBase_Productos]=useState([])
 
  return (
    <MiContexto.Provider value={{ 
      mensaje, setMensaje,
      MinPrice,SetMinPrice,
      MaxPrice,SetMaxPrice,
      SelectStuck,SetSelectStuck,
      SelectCategoria,SetSelectCategoria,
      DataBase_Productos,Set_DataBase_Productos

      }}>
      {children}
    </MiContexto.Provider>
  );
};

export default AppProvider;
