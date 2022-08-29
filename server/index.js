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

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "11139598",
    database:"intranetdb",
});
//  const db = mysql.createPool({
//       user: 'root',
//       host: 'localhost',
//       password: '',
//       database: 'clientsys',
    
//   })

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



app.get('/api/get/:type', (req, res) => {
    const { type} = req.params;
    db.query('SELECT * FROM clienttypes WHERE type = ?', type,
    (err, result) => {
    res.send(result)
    }
    );

})

app.get('/api/get1', (req, res) => {

    db.query('SELECT * FROM clienttypes ',
    (err, result) => {
    res.send(result)
    }
    );

})






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


/************************** affichage des boutons selon les types ******************/ 

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

/******************************** Database of ALL clients *********************/
app.post("/api/alter", (req, res) => {
    
    table = req.body.table ;
    typeFields = req.body.typeFields ;
    let list = [];
    let sql = `ALTER TABLE clientstable`;

    for (let i = 0; i < typeFields.length; i++) {
            list[i] = typeFields[i].field ; 
            sql = sql + ` ADD ${list[i]} VARCHAR(60),`
        }
    sql = sql.slice(0,-1);
  
    db.query(sql, (err, result) => {
        console.log(result);
        console.log(err);
  
      res.send(`added to clientstable`);
  
    });
  
  });

  /************** page AffichageTotal******************/
  app.get('/api/getClients/', (req, res) => {
    const {q} = req.query;
    

    const search = (data) => {
         let keys = Object.keys(data[0]);
        return data.filter((item) => keys.some((key) => String(item[key]).toLowerCase().includes(q))
    )
    }
    db.query('SELECT * FROM clientstable',
    (err, result) => {
        if (result.length !== 0)
        {res.send(search(result));
       }
        else {
            res.send(result);
        }
    }
    );

})
app.get('/api/getFields', (req, res) => {
    db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'clientstable' ORDER BY ordinal_position ;`,
    (err, result) => {
    res.send(result);
    }
    );

})
/********************* Page AddEditIntegral **********************/
app.post('/api/insertIntegral/:type', (req, res) => {
    console.log(req.body);
    type = req.params;
    console.log(type);
    console.log(req.body);
    const fieldContent = req.body.fieldContent ;
    const fieldList = req.body.fieldList ;
    let list = []
    for (let i=0 ; i<=fieldContent.length; i++){
        list[i] = "?";
    }
    const fieldList2 = ['type', 'status', ...fieldList]

    db.query(`INSERT INTO clientstable (${fieldList2}) VALUES (${list}) `, [type.type , ...fieldContent],
    (err, result) => {
    console.log(err)
    }
    );
    

});

app.put('/api/update/:type/:id', (req, res) => {
    const { id } = req.params;
    const { type } = req.params;
    console.log(id);
    console.log(type)
    const fieldContent = req.body.fieldContent ;
    const fieldList = req.body.fieldList ;
    console.log(req.body);
    let list = []
    for (let i=0 ; i<fieldContent.length; i++){
        list[i] = "?";
    }
    const fieldList2 = ['type', 'status', ...fieldList]
    const fieldContent2 = [type, ...fieldContent]
    sql = `UPDATE clientstable SET`
    for (let i = 0 ; i< fieldContent2.length ; i++) {
        sql = sql + ` ${fieldList2[i]} = ?,`
    }
    sql = sql.slice(0,-1);
    sql = sql + ` WHERE id = ?`

    

    db.query(sql,[...fieldContent2, id],
    (err, result) => {
    res.send(result)
    console.log(err)
    }
    );

})

app.delete('/api/delete2/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.query(`DELETE FROM clientstable WHERE id= ?`,id,
    (err, result) => {
        if(err) console.log(err)
        console.log(result);
    }
    );

});
app.get('/api/get3/:type/:id', (req, res) => {
    const {id} = req.params;
    const {type} = req.params;
    db.query(`SELECT * FROM clientstable WHERE id = ? `, id,
    (err, result) => {
    res.send(result)
    // console.log(result)
    }
    );

})
app.get('/api/getClients/:type', (req, res) => {
    const { type } = req.params;
    const {q} = req.query;

    const search = (data) => {
        let keys = Object.keys(data[0]);
       return data.filter((item) => keys.some((key) => String(item[key]).toLowerCase().includes(q))
   )
   }
    db.query(`SELECT * FROM clientstable WHERE type = ? `, type,
    (err, result) => {
    if (result.length !== 0)
    {res.send(search(result));}
    else {
        res.send(result);
    }
    }
    );

})
/**********************************************************************************/
app.listen(3001, ()=> {
    console.log('running on port 3001');
});