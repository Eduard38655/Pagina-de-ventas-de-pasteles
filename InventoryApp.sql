 
 CREATE TABLE Categoria(
CategoriaID INT IDENTITY(1,1) PRIMARY KEY,
Categoria nvarchar(15)

)
 
CREATE TABLE Productos(

ProductosID INT IDENTITY(1,1) PRIMARY KEY,
Producto nvarchar(50),
Price decimal,
Codigo nvarchar(50),
Cantidad INT,
IMG nvarchar(350) null,
CategoriaID INT,
Description nvarchar(350),
Fecha DATETIME DEFAULT GETDATE(),
Status AS (CASE WHEN Cantidad > 0 THEN 'Available' ELSE 'Agotado' END)

)

 
 
INSERT INTO Productos(Producto, Price, Codigo, Cantidad, IMG, CategoriaID, Description) values
('Laptop',30.22,'55rca4e5sd',124,'https://tse4.mm.bing.net/th/id/OIP.LC3L-DAYn-SDKYUN423uFQHaE8?rs=1&pid=ImgDetMain',1,'ssssss')
 

INSERT INTO Productos(Producto,Price,Codigo,Cantidad,IMG,CategoriaID,Description) values
('Computer',20,'55rca4e5sd',0,'https://tse4.mm.bing.net/th/id/OIP.LC3L-DAYn-SDKYUN423uFQHaE8?rs=1&pid=ImgDetMain',1,'ssssss')

 /*

INSERT INTO Categoria(Categoria)VALUES('Accesorios')

select * from Productos
select * from Categoria

select * from Productos
inner join Categoria on Productos.CategoriaID=Categoria.CategoriaID  
 

INSERT INTO Productos(CategoriaID)
select CategoriaID from Categoria 

 
  */