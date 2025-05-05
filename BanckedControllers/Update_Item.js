import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import SQL from "mssql";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 

const allowedOrigins = ['http://localhost:5173', 'http://10.0.0.86:5173'];

router.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Permite peticiones sin origin (por ejemplo, peticiones de herramientas como Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  exposedHeaders: ['set-cookie']
}));


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, "public")));

const dbConfig = {
  server: process.env.server,
  database: process.env.database,
  user:  process.env.user,
  password:  process.env.password,
  options: {
      encrypt: process.env.DB_ENCRYPT === 'true',               
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' 
    }
};

router.put("/Productos/Update", async (req, res) => {
  const { ProductoID, Producto, Codigo, Descripcion, Cantidad, Precio, imageUrl } = req.body;

  try {
    const pool = await SQL.connect(dbConfig);

    const result = await pool
      .request()
      .input("ProductoID", SQL.Int, ProductoID)
      .input("Producto", SQL.NVarChar, Producto)
      .input("Codigo", SQL.NVarChar, Codigo)
      .input("Descripcion", SQL.NVarChar, Descripcion)
      .input("Cantidad", SQL.Int, Cantidad)
      .input("Precio", SQL.Money, Precio)
      .input("imageUrl", SQL.NVarChar, imageUrl)
      .query(`
        UPDATE Productos 
        SET 
          Producto = @Producto,
          Codigo = @Codigo,
          Description = @Descripcion,
          Cantidad = @Cantidad,
          Price = @Precio,
          IMG = @imageUrl
        WHERE 
          ProductosID = @ProductoID
      `);

    SQL.close();

    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Producto actualizado correctamente." });
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }

  } catch (error) {
    console.error(error);
    SQL.close();
    res.status(500).json({ error: "Error actualizando el producto." });
  }
});

export default router;
