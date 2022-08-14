const express = require("express");
const bodyParser = require ('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require ('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10

const cookieParser = require('cookie-parser');
const session = require('express-session');

/*const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "11139598",
    database:"intranetdb",
});*/
  const db = mysql.createPool({
      user: 'root',
      host: 'localhost',
      password: '',
      database: 'clientsys',
    
  })

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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


/*******************connection and regisration************** */


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

/******************* Manipulation des clients ************** */
app.post('/api/insert/:type', (req, res) => {
    console.log(req.body);
    const {type} = req.params;

    const car1 = req.body.car1;
    const car2 = req.body.car2;
    const car3 = req.body.car3;
    const car4 = req.body.car4;
    const car5 = req.body.car5;

    db.query(`INSERT INTO ${type} (car1,car2,car3,car4,car5) VALUES (?,?,?,?,?)`,[car1, car2, car3, car4, car5],
    (err, result) => {
    console.log(result)
    }
    );

});

app.get('/api/get3/:type/:id', (req, res) => {
    const {id} = req.params;
    const {type} = req.params;
    db.query(`SELECT * FROM ${type} WHERE id = ? `, id,
    (err, result) => {
    res.send(result)
    console.log(result)
    }
    );

})


app.get('/api/get/:type', (req, res) => {
    const { type} = req.params;
    db.query('SELECT * FROM clienttypes WHERE type = ?', type,
    (err, result) => {
    res.send(result)
    }
    );

})

app.get('/api/get2/:type', (req, res) => {
    const { type } = req.params;
    db.query(`SELECT * FROM ${type} `,
    (err, result) => {
    res.send(result)
    }
    );

})

app.put('/api/update/:type/:id', (req, res) => {
    const { id } = req.params;
    const { type } = req.params;

    const car1 = req.body.car1;
    const car2 = req.body.car2;
    const car3 = req.body.car3;
    const car4 = req.body.car4;
    const car5 = req.body.car5;

    db.query(`UPDATE ${type} SET car1=? , car2=?, car3 =?, car4=? car5=? WHERE id=?`,[car1, car2, car3, car4, car5 ,id],
    (err, result) => {
    res.send(result)
    console.log(result)
    }
    );

})

app.delete('/api/delete/:type/:id', (req, res) => {
    const  {type} = req.params;
    const { id } = req.params;

    db.query(`DELETE FROM ${type} WHERE id= ?`,id,
    (err, result) => {
        if(err) console.log(err)
        console.log(result)
    }
    );

});

  /***************************fill clienttypes table *************************/
  app.post("/api/fill", (req, res) => {
    
    table = req.body.table ;
    typeFields = req.body.typeFields ;
    const list = [];

    let sql = 'INSERT INTO clienttypes (type, field1, field2, field3, field4, field5) VALUES (?,?,?,?,?,?)';

    for (let i = 0; i < typeFields.length; i++) {
            list[i] = typeFields[i].field ; 
        }
        if (typeFields.length < 5){
            for (let j = typeFields.length + 1 ; j<5 ; j++) {
                list[j]= null ; 
            }
        }

  
    db.query(sql, [table, ...list] , (err, result) => {
        console.log(result);
  
      res.send(`Column ${table} in clienttypes is filled`);
  
    });
  
  });

/************************** Admin adding type client ******************/ 

app.post("/api/create", (req, res) => {
    
    table = req.body.table ;
    typeFields = req.body.typeFields ;

    let str = `CREATE Table ${table} (id int AUTO_INCREMENT PRIMARY KEY,`;

    for (let i = 0; i < typeFields.length; i++) {
        str = str + ` ${typeFields[i].field} VARCHAR(100) ,`;
    }
  
    
    console.log(typeof(str));
    str = str.slice(0, -1);

    let sql = str + `)`;
  
    db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send(`Table ${table} created`);
  
    });
  
  });



app.listen(3001, ()=> {
    console.log('running on port 3001');
});

/************************** affichage des boutons selon les types ******************/ 
app.get('/api/get1', (req, res) => {

    db.query('SELECT * FROM clienttypes ',
    (err, result) => {
    res.send(result)
    }
    );

})
