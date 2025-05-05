import React, { useContext } from "react";
import Styles from "../Components_Styles/NewThem.module.css";
import { ThemeContext } from "../Context/Themes.jsx";


function Swich_Color() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <button className={Styles.Button} onClick={toggleTheme}>
      {theme === "light" ? (
        <i className="fa-solid fa-moon"></i>  // Mostrar luna si está en light
      ) : (
        <i className="fa-solid fa-sun"></i>   // Mostrar sol si está en dark
      )}
    </button>
  );
}

export default Swich_Color;
