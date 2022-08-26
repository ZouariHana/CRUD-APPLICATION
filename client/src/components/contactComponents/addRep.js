import React, {useState, useEffect} from "react";
import {useParams, Link, useInRouterContext} from "react-router-dom";
import axios from 'axios'
import "./Historique.css"
import Header from "../../pages/Header";



function AddRep() {


    const {id} = useParams();

    
    const [file, setfile] = useState(null)
    const [modif, setmodif] = useState("")
    const [date, setdate] = useState("")

   
        
      const addUp = (e) => {
        e.preventDefault();
        const data = new FormData()
        console.log(file)
        data.append('file',file)
        axios.put(`http://localhost:3001/api/upload/${id}/${date}/${modif}`,//{
               data
    //}
    )
    .then((e) => {
        console.log("success");
        
      
    })
    .catch((e) => {
        console.error('error',e)
    })
        
    
      }
      

    

    return(
        <div>
            <Header/>
            <div className="nouveau">
                <h1 > Ajout d'une réponse</h1>
                <form style={{
                   margin: "auto",
                   padding:"15px",
                   aligncontent: "center",
                   border: "3px royal blue",
                   width:"80%",
                   

                   
            }}
            onSubmit={addUp}>

              <div class="form-group ">
                 
            
                <label>Date du réponse</label>
                <input
                type="date"
                id="date"
                name="date" 
                onChange={(event) =>{
                    setdate(event.target.value);
                  }}
                  
                /><div class="form-group files">
                <br/>
                <label>Modification</label>
                <input
                type="text"
                id="nom"
                name="nom"
                onChange={(event) =>{
                    setmodif(event.target.value);
                  }} 
                /> 
                <br/>
                <label>Contenu (PDF ou capture du mail)</label>
                <input
                type="file"
                id="contenu"
                className="form-control"
                multiple=""
                onChange={(event) =>{
                    setfile(event.target.files[0]);
                  }}
                />
                <br/> 
                
                </div></div>
                <input type="submit"  />
               
            </form>



            </div>
            
            
        </div>
        )
}

export default AddRep;