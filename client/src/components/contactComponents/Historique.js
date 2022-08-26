import React, {useState, useEffect} from "react";
import {useParams, Link, useInRouterContext} from "react-router-dom";
import axios from 'axios'
import "./Historique.css"
import Header from "../../pages/Header";
import Filedownload from "js-file-download"


function Historique() {


    const {id} = useParams();
    const {type} = useParams();

    const [histlist,sethistlist] =useState([])
    const [reqlist, setreqlist] = useState([])
    
    const [file, setfile] = useState(null)
    const [nom, setnom] = useState("")
    const [date, setdate] = useState("")

    const [filerep, setfilerep] = useState(null)
    const [changement, setchangement] = useState("")
    const [daterep, setdaterep] = useState("")


    const deleteContact = (id1) => {
      if(window.confirm("Vous etes sures que vous voulez supprimer ce client ?"))
      axios.delete(`http://localhost:3001/api/delete/${id1}`)
  
    }
        
      const addcontact = (e) => {
        e.preventDefault();
        const data = new FormData()
        console.log(file)
        data.append('file',file)
        axios.post(`http://localhost:3001/api/upload/${type}/${id}/${nom}/${date}`,//{
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
      useEffect(() => {
        axios.get(`http://localhost:3001/api/gethis/${type}/${id}`).then((response) => {
          console.log(response)
          sethistlist(response.data)
        })
      }, [type,id])

  
    const download=(e,image) =>{
      e.preventDefault()
      axios({
        url:`http://localhost:3001/api/down/${image}`,
        method:"GET",
        responseType:"blob"
      }).then((res)=>{
        console.log(res)
        var  fileExtension;
        fileExtension = image.replace(/^.*\./, '');
        var imagesExtension = ["png", "jpg", "jpeg"];
            if(imagesExtension.indexOf(fileExtension) !== -1){
              Filedownload(res.data,"downloaded.png")
          } else{ 
            Filedownload(res.data,"downloaded.pdf")
          }
            
          })

    }


    return(
        <div>
            <Header/>
            <div className="nouveau">
                <h1 > Ajout d un nouveau contact</h1>
                <form style={{
                   margin: "auto",
                   padding:"15px",
                   aligncontent: "center",
                   border: "3px royal blue",
                   width:"80%",
                   

                   
            }}
            onSubmit={addcontact}>

              <div class="form-group ">
                 <label>Nom du contact</label>
                <input
                type="text"
                id="nom"
                name="nom"
                onChange={(event) =>{
                    setnom(event.target.value);
                  }} 
                /> 
                <br/>
                <label>Date du contact</label>
                <input
                type="date"
                id="date"
                name="date" 
                onChange={(event) =>{
                    setdate(event.target.value);
                  }}
                  
                /><div class="form-group files">
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
                <br/> </div></div>
                <input type="submit"  />
               
            </form>



            </div>
            
            
            <div className="Liste">
    
            <h1> Historique des contacts </h1>
            
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom du contact</th>
                        <th>Date du contact</th> 
                        <th>contenu du mail de contact</th>
                        <th>date du réponse</th>
                        <th>contenu du mail de réponse</th>
                        <th>Y a-t-il un changement du statut suite à ce contact ? </th>
                    </tr>
                </thead>
                <tbody>
                {histlist.map((item, index) => {
                return (
                    <tr key={item.id} >
                        
                            <td>{item.nom}</td>
                            <td>{item.dateenv}</td>
                            <td><img src={`//localhost:3001/${item.image}`} alt={item.imageorg} class="req"/>
                            <br/> <button onClick={(e)=> download(e,item.image)}>Télécharger</button></td>

                            <td>{item.daterep}</td>
                            <td><img src={`//localhost:3001/${item.imagerep}`} alt={item.imagereporg} class="req"/>
                            <br/> <button onClick={(e)=> download(e,item.imagerep)}>Télécharger</button></td>

                            <td>
                              
                                <Link to={`/rep/${item.id}`}>
                                <button className="btn btn-upd">Ajout response</button>
                                </Link>
                        
                                <button className="btn btn-del" onClick={() => deleteContact(item.id) }>Supprimer</button>
                               
                              

                            </td>

                  </tr>
                )
                })}
                    
                </tbody>

            </table>
           
               
           
      </div></div>
        )
}

export default Historique;