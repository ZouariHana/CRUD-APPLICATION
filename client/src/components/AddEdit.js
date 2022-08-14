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
    const [ClientList, setClientlist] = useState([])
    
    
    const[type1, settype1] = useState({});

    const {id} = useParams();
    const {type} = useParams();

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get3/${type}/${id}`)
        .then((resp) =>  {
            setcar1(resp.data[0].car1)
            setcar2(resp.data[0].car2)
            setcar3(resp.data[0].car3)
            setcar4(resp.data[0].car4)
            setcar5(resp.data[0].car5)
           
        })
        

    },[type, id])
    
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => settype1({...resp.data[0]}))
        
        

    },[type])

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
                });
            
                setClientlist([...ClientList, {
                    car1: car1,
                    car2: car2,
                    car3: car3,
                    car4: car4,
                    car5: car5,
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
                });
                
            
                setClientlist([...ClientList, {
                    car1: car1,
                    car2: car2,
                    car3: car3,
                    car4: car4,
                    car5: car5,
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
                <label>{type1.field1}</label>
                <input
                type="text"
                id="nom"
                name="nom"
                placeholder="votre nom" 
                value={car1 || ""}
                onChange={(event) =>{
                    setcar1(event.target.value);
                  }}
                />

                

                <label>{type1.field2}</label>
                <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="votre prenom"
                value={car2 || ""}
                onChange={(event) =>{
                    setcar2(event.target.value);
                  }}
                />
                

                <label>{type1.field3}</label>
                <input
                type="text"
                id="CIN"
                name="CIN"
                placeholder="votre CIN"
                value={car3 || "" }
                onChange={(event) =>{
                    setcar3(event.target.value);
                  }}
                />
                
                <label>{type1.field4}</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="votre adresse email"
                value={car4 || "" }
                onChange={(event) =>{
                    setcar4(event.target.value);
                  }}
                  />

                  <label>{type1.field5}</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="votre adresse email"
                value={car5 || "" }
                onChange={(event) =>{
                    setcar5(event.target.value);
                  }}
                  />
                
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