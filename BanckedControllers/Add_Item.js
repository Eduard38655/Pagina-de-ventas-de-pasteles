import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import SQL from "mssql";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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





router.post("/Productos/Add", (req, res) => {
  const { ProductoID, Producto, Codigo, Descripcion, Cantidad, Precio, imageUrl, Categoria } = req.body;

  SQL.connect(dbConfig).then(pool => {
    const transaction = new SQL.Transaction(pool);

    transaction.begin().then(() => {
      const request1 = new SQL.Request(transaction);
      request1
        .input("ProductoID", SQL.Int, ProductoID)
        .input("Producto", SQL.NVarChar, Producto)
        .input("Codigo", SQL.NVarChar, Codigo)
        .input("Descripcion", SQL.NVarChar,Descripcion)
        .input("Cantidad", SQL.Int, Cantidad)
        .input("Precio", SQL.Decimal, Precio)
        .input("imageUrl", SQL.NVarChar(200), imageUrl)
        .query(`
          INSERT INTO Productos (Producto, Codigo, Description, Cantidad, Price, IMG)
          VALUES (@Producto, @Codigo, @Descripcion, @Cantidad, @Precio, @imageUrl)
        `)
        .then(() => {
          const request2 = new SQL.Request(transaction);
          return request2
            .input("Categoria", SQL.NVarChar(100), Categoria)
            .query(`INSERT INTO Categoria (Categoria) VALUES (@Categoria)`);
        })
        .then(() => {
          return transaction.commit();
        })
        .then(() => {
          res.status(201).json({ mensaje: "Productos y categoría insertados correctamente." });
          return pool.close();
        })
        .catch(err => {
          transaction.rollback().then(() => {
            console.error("Error en transacción:", err);
            res.status(500).json({ error: "Error al insertar datos." });
            pool.close();
          });
        });
    }).catch(err => {
      console.error("Error al iniciar transacción:", err);
      res.status(500).json({ error: "Error al iniciar transacción." });
      pool.close();
    });

  }).catch(err => {
    console.error("Error al conectar con la base de datos:", err);
    res.status(500).json({ error: "Error de conexión con la base de datos." });
  });
});


export default router;
