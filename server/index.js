const express = require("express");
const bodyParser = require ('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require ('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10

const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "11139598",
    database:"intranetdb",
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "confidential_stuff",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }

})
);

app.post('/register', (req, res) => {
    const username = req.body.user ;
    const password = req.body.pwd ;
    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }
        db.query(" INSERT INTO users (login, password) VALUES (?,?)", [username, hash], (err, result) => {
            console.log(err);
        })
    })
   

})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    } else {
        res.send({ loggedIn: false}); 
    }
})

app.post('/login', (req, res) =>{
    const username = req.body.userConn ;
    const password = req.body.pwdConn ;
    db.query(" SELECT * FROM users WHERE login = ?", username, (err, result) => {
        if (err){
        res.send({err : err});
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password , (error, response) => {
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                } else {
                    res.send({message: "Votre mot de passe est incorrect"});
                }

            }); 
        } else {
             res.send({ message : "Cet utilisateur n'existe pas"})
        }
    }
    )
})

// app.get("/api/get", (req, res) => {
//     const sqlSelect = "SELECT * FROM clientmoral";
//     db.query(sqlSelect, (err, result) =>{
//         res.send(result);
//         });
// })

// app.post("/api/insert", (req, res) => {
//     const n = req.body.nom 
//     const g = req.body.gouvernorat
//     const sqlInsert= " INSERT INTO clientmoral (nom, gouvernorat) VALUES (?,?)";
//     db.query(sqlInsert, [n, g], (err, result) =>{
//         console.log(result);
//         });
// });

// app.get( "/api/insert", (req, res) => {
//     res.send("Hello world!");
// })
app.listen(3001, ()=> {
    console.log('running on port 3001');
});
