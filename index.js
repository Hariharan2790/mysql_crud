const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql2");

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database:"crud_contact"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

// app.post("/api/post", (req, res) => {
//     const {name,email, contact } = req.body;
//     const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES(?,?,?)";
//     db.query(sqlInsert, [name,email,contact], (error, result) => {
//         res.send(result);
//         if (error) {
//             console.log(error);
//         }
//     })
// })

app.delete("/api/remove/:id", (req, res) => {
    const { id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
       if (error) {
        console.log(error);
       }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id} = req.params;
    const sqlGetID = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGetID, id,(error, result) => {
        if (error) {
            console.log(error);
           }
        res.send(result);

    })
})

app.put("/api/put/:id", (req, res) => {
    const { id} = req.params;
    const {name,email, contact} = req.body;
    const sqlPut = "UPDATE contact_db SET name=? email=? contact=? WHERE id=?";
    db.query(sqlPut, [ name,email, contact], id,(error, result) => {
        if (error) {
            console.log(error);
           }
        res.send(result);

    })
})

app.get('/', (req, res) => {
    const mysqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john','john@gmail.com','87456789')";
    db.query(mysqlInsert, (error, result)=>{
        console.log("error", error);
        console.log("result", result);  
        res.send("hello mysql!")
     
    })
})


app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})