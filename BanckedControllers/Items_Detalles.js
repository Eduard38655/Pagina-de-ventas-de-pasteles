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

 
router.post("/Productos/VerDetalles", (req, res) => {
const {ProductoID}=req.body;
  
    
    SQL.connect(dbConfig).then(pool=>{

        return pool 
        .request()
        .input("ProductoID",SQL.Int,ProductoID)
        
      
.query(`
select * from Productos
inner join Categoria on 
Productos.CategoriaID=Categoria.CategoriaID 
where ProductosID=@ProductoID
`);
    })
    .then(result=>{
        if (result.recordset.length>0 ) {
          console.log(result.recordset);
            res.json({data:result.recordset})
            
        }
        else{
            res.json({error:"No se pudo mostrar los items"})
        }
    })
    .catch(error=>{
        console.error(error);
        res.status(401).json({DataBase:"There was an error"})
        
    })



});
 

export default router