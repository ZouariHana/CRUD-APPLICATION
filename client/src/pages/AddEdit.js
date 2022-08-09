import React,{useState, useEffect} from "react";
import {useHistory, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import Axios from "axios";



function AddEdit() {
    const [nom,setnom] = useState('')
    const [prenom,setprenom] = useState('')
    const [CIN,setCIN] = useState('')
    const [email,setemail] = useState('')
    const [ClientList, setClientlist] = useState([])
    
    const {id} = useParams();

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${id}`)
        .then((resp) =>  {
            setnom(resp.data[0].nom)
            setprenom(resp.data[0].prenom)
            setCIN(resp.data[0].CIN)
            setemail(resp.data[0].email)

        })
        

    },[id])
   
    const addClient = (e) => {
        e.preventDefault();
        if(!nom || !prenom || !CIN || !email){
            alert("veuillez remplir tous les champs")
        }
        else{
            if (!id) {
                Axios.post("http://localhost:3001/api/insert",{
                nom: nom,
                prenom: prenom,
                CIN: CIN,
                email:email,
                });
            
                setClientlist([...ClientList, {
                    nom: nom,
                    prenom: prenom,
                    CIN:CIN,
                    email:email,
                }])
                
                alert("Un nouveau client est ajouté")
            }

            else{
                Axios.put(`http://localhost:3001/api/update/${id}`,{
                nom: nom,
                prenom: prenom,
                CIN: CIN,
                email:email,
                });
            
                setClientlist([...ClientList, {
                    nom: nom,
                    prenom: prenom,
                    CIN:CIN,
                    email:email,
                }])
                
                alert("les données sont changées avec succés")
            

            }
            
        
      }}


    return (
        <div>
        <div className="header">
                <nav>
                    <div className="nav-links">
                    <ul>
                        
                        <li><a href="/">Home</a></li>
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
                <label>Nom</label>
                <input
                type="text"
                id="nom"
                name="nom"
                placeholder="votre nom" 
                value={nom || ""}
                onChange={(event) =>{
                    setnom(event.target.value);
                  }}
                />

                

                <label>Prenom</label>
                <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="votre prenom"
                value={prenom || ""}
                onChange={(event) =>{
                    setprenom(event.target.value);
                  }}
                />
                

                <label>CIN</label>
                <input
                type="text"
                id="CIN"
                name="CIN"
                placeholder="votre CIN"
                value={CIN || "" }
                onChange={(event) =>{
                    setCIN(event.target.value);
                  }}
                />
                
                <label>Email</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="votre adresse email"
                value={email || "" }
                onChange={(event) =>{
                    setemail(event.target.value);
                  }}
                />
                
                <input type="submit" value={id ? "Modifier" :"Sauvegarder"} />
                <Link to="/affichage">
                    <input type="button" value="Retour" />
                </Link>

            </form>
        </div>
        </div>
    )
}

export default AddEdit;