import React,{useState, useEffect} from "react";
import {useHistory, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import Axios from "axios";



function AddEdit() {
    const [car1,setcar1] = useState('')
    const [car2,setcar2] = useState('')
    const [car3,setcar3] = useState('')
    const [car4,setcar4] = useState('')
    const [car5,setcar5] = useState('')
    const [status, setStatus] = useState('')
    const [ClientList, setClientlist] = useState([])
    const [statusList, setStatusList] = useState([]);
    
    
    const[type1, settype1] = useState({});

    const {id} = useParams();
    const {type} = useParams();

    Axios.get("http://localhost:3001/api/getStatus").then((response) => {
        setStatusList(response.data);
    })

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get3/${type}/${id}`)
        .then((resp) =>  {
            console.log(resp.data);
            setcar1(resp.data[0].car1)
            setcar2(resp.data[0].car2)
            setcar3(resp.data[0].car3)
            setcar4(resp.data[0].car4)
            setcar5(resp.data[0].car5)
            setStatus(resp.data[0].status)
           
        })
        

    },[type, id])
    
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => settype1({...resp.data[0]}))
        
        

    },[type])

    // useEffect(()=>{
    //     Axios.get(`http://localhost:3001/api/get2/${type}`)
    //     .then((resp) => setClientlist(resp.data))
        
        

    // },[type])

    const addClient = (e) => {
        e.preventDefault();
        /*if(!nom || !prenom || !CIN || !email){
            alert("veuillez remplir tous les champs")
        }*/
        //else{
            if (!id) {
                Axios.post(`http://localhost:3001/api/insert/${type}`,{
                car1: car1,
                car2: car2,
                car3: car3,
                car4: car4,
                car5: car5,
                status: status
                });
            
                setClientlist([...ClientList, {
                    car1: car1,
                    car2: car2,
                    car3: car3,
                    car4: car4,
                    car5: car5,
                    status: status
                }])
                
                alert("Un nouveau client est ajouté")
            }

            else{
                Axios.put(`http://localhost:3001/api/update/${type}/${id}`,{
                 
                    car1: car1,
                    car2: car2,
                    car3: car3,
                    car4: car4,
                    car5: car5,
                    status: status
                });
                
            
                setClientlist([...ClientList, {
                    car1: car1,
                    car2: car2,
                    car3: car3,
                    car4: car4,
                    car5: car5,
                    status: status
                }])
               
                
                alert("les données sont changées avec succés")
            

            //}
            
        
      }}


    return (
        <div>
        <div className="header">
                <nav>
                    <div className="nav-links">
                    <ul>
                        
                        <li><a href="/">déconnectez-vous </a></li>
                    </ul>
                    </div>
                </nav>
        </div>
        
        
        <div className="formulaire" >
            <h1 >Ajout d'un client</h1>
            <form style={{
                   margin: "auto",
                   padding:"15px",
                   aligncontent: "center",
                  
                   
            }}
            onSubmit={addClient}>
                { type1.field1 &&
                <div>
                 <label>{type1.field1}</label>
                <input
                type="text"
                id="nom"
                name="nom" 
                value={car1 || ""}
                onChange={(event) =>{
                    setcar1(event.target.value);
                  }}
                />
                </div> }

                

                { type1.field2 &&
                <div>
                <label>{type1.field2}</label>
                <input
                type="text"
                id="prenom"
                name="prenom"
                value={car2 || ""}
                onChange={(event) =>{
                    setcar2(event.target.value);
                  }}
                />
                </div> }
                
         
                { type1.field3 &&
                <div>
                <label>{type1.field3}</label>
                <input
                type="text"
                id="CIN"
                name="CIN"
                value={car3 || "" }
                onChange={(event) =>{
                    setcar3(event.target.value);
                  }}
                />
                </div> }
                
                { type.field4 && 
                <div>
                <label>{type1.field4}</label>
                <input
                type="email"
                id="email"
                name="email"
                value={car4 || "" }
                onChange={(event) =>{
                    setcar4(event.target.value);
                  }}
                  />
                </div> }

                { type1.field5 &&
                <div>
                <label>{type1.field5}</label>
                <input
                type="text"
                value={car5 || "" }
                onChange={(event) =>{
                    setcar5(event.target.value);
                  }}
                  />
                </div> }

            <label>Statut</label>
            <select name="clientStatus" /*id={clientStatus}*/ onChange={(event) => {
                setStatus(event.target.value);
            }}>
              <option value="blank"></option>  
              {statusList.map((item, index) => {
                return(
                    <option>{item.status}</option>
                )
              })}
            </select>
                <input type="submit" value={id ? "Modifier" :"Sauvegarder"} />
                <Link to={`/affichage/${type}`}>
                    <input type="button" value="Retour" />
                </Link>

            </form>
        </div>
        </div>
    )
}

export default AddEdit;