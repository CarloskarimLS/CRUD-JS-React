import express  from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"tHV2Io_[m7fwqcY",
    database:"crudreact"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hola este es el backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM crudreact.books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)        
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("El libro se ha creado correctamente!")  
    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("El libro se ha borrado correctamente!")  
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];


    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("El libro se ha actualizado correctamente!")  
    });
});

app.listen(8800, ()=>{
   console.log("Connected to backend!") 
})