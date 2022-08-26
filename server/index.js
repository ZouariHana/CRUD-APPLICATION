const express = require("express");
const bodyParser = require ('body-parser')
const multer  = require('multer')
const path = require('path')

const app = express();
const mysql = require('mysql');
const cors = require ('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'request')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname)
    }

});
const upload = multer({storage})
app.use(express.static('request'))

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
        expires: 1000 * 60 * 60 * 24,
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
    console.log(req.session.user)
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
app.get('/logout', (req, res) => {
    res.clearCookie("userId",{path:"/"});
    req.session.destroy();
    res.send({ loggedIn: false}); 
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
    const status = req.body.status;

    db.query(`INSERT INTO ${type} (car1,car2,car3,car4,car5, status) VALUES (?,?,?,?,?,?)`,[car1, car2, car3, car4, car5,status],
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
    // console.log(result)
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
    console.log(id);
    console.log(type)

    const car1 = req.body.car1;
    const car2 = req.body.car2;
    const car3 = req.body.car3;
    const car4 = req.body.car4;
    const car5 = req.body.car5;
    const status = req.body.status;

    db.query(`UPDATE ${type} SET car1=? , car2=?, car3 =?, car4=? , car5=?, status=? WHERE id=?`,[car1, car2, car3, car4, car5 ,status, id],
    (err, result) => {
    res.send(result)
    console.log(err)
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
    // typeFields = req.body.typeFields ;

    let str = `CREATE Table ${table} (id int AUTO_INCREMENT PRIMARY KEY, car1 VARCHAR(50), car2 VARCHAR(50),car3 VARCHAR(50),car4 VARCHAR(50),car5 VARCHAR(50), status VARCHAR(100))`
  ;

    // for (let i = 0; i < typeFields.length; i++) {
    //     str = str + ` ${typeFields[i].field} VARCHAR(100) ,`;
    // }
  
    
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





/************************** affichage des boutons selon les types ******************/ 
app.get('/api/get1', (req, res) => {

    db.query('SELECT * FROM clienttypes ',
    (err, result) => {
    res.send(result)
    }
    );

})
/****************************Manipulation des statuts ************************/
app.post("/api/addStatus", (req, res) => {
    statut = req.body.status ;
    let sql = `INSERT INTO statuslist (status) VALUES (?)`;
    db.query(sql, statut, (err, result) => {
        console.log(err);
    })

})

app.get("/api/getStatus", (req, res) => {
    let sql = db.query(`SELECT * FROM statuslist`, (err, result) => {
        res.send(result);
    })
})

app.delete('/api/deleteStatus/:id', (req, res) => {
    const {id} = req.params ;

    db.query(`DELETE FROM statuslist WHERE id= ?`,id,
    (err, result) => {
        if(err) console.log(err)
        // console.log(result)
    }
    );

});

/****************************Manipulation des employés ************************/


app.delete('/api/del/:id', (req, res) => {
    
    const { id } = req.params;

    db.query(`DELETE FROM users WHERE id= ?`,id,
    (err, result) => {
        if(err) console.log(err)
        console.log(result)
    }
    );

});

app.put('/api/upag/:id', (req, res) => {
    const { id } = req.params;
    

    db.query(`UPDATE users SET role="agent"  WHERE id=?`,id,
    (err, result) => {
    res.send(result)
    console.log(err)
    }
    );

})

app.put('/api/upad/:id', (req, res) => {
    const { id } = req.params;
    

    db.query(`UPDATE users SET role="admin"  WHERE id=?`,id,
    (err, result) => {
    res.send(result)
    console.log(err)
    }
    );

})
app.get('/api/getEmp', (req, res) => {
    
    db.query('SELECT * FROM users ', 
    (err, result) => {
    res.send(result)
    }
    ); 

})
/********hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh********************Historique********************************************/
app.post("/api/upload/:type/:id/:nom/:date", upload.single('file'), (req, res) => {
    const {type} = req.params;
    const {id} = req.params;
    const {nom} = req.params;
    const {date} = req.params;
    console.log(req.file)
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc =  req.file.filename 
        console.log(req.file.originalname)
        var imgorg =req.file.originalname
        var insertData = "INSERT INTO historique (image,imageorg,type,idt,nom,dateenv) VALUES(?,?,?,?,?,?)  "
        db.query(insertData, [imgsrc,imgorg,type,id,nom, date], (err, result) => {
            if (err) throw err
            
            console.log("file uploaded")
        })
    }
    })



app.get('/api/gethis/:type/:id', (req, res) => {
    const { type} = req.params;
    const { id} = req.params;
    db.query('SELECT * FROM historique WHERE type = ? AND idt= ?', [type,id],
    (err, result) => {
        console.log(err)
    res.send(result)
    }
    
    );

})

app.delete('/api/delete/:id1', (req, res) => {
    const { id1 } = req.params;

    db.query(`DELETE FROM historique WHERE id= ?`,id1,
    (err, result) => {
        if(err) console.log(err)
        console.log(result)
    }
    );

});

app.put("/api/upload/:id/:date/:modif", upload.single('file'), (req, res) => {
  
    const {id} = req.params;
    const {modif} = req.params;
    const {date} = req.params;
    console.log(req.file)
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc =  req.file.filename 
        console.log(req.file.originalname)
        var imgorg =req.file.originalname
        var insertData = "UPDATE historique SET imagerep =? , imagereporg = ? , daterep = ? , changement=?  WHERE id=?  "
        db.query(insertData, [imgsrc,imgorg,date,modif,id], (err, result) => {
            if (err) throw err
            
            console.log("file uploaded")
        })
    }
    })

  app.get(`/api/down/:image`,(req,res) => {
    const { image } = req.params;
    res.download(`./request/${image}`)
  })  
/**********************************************************************************/
app.listen(3001, ()=> {
    console.log('running on port 3001');
});