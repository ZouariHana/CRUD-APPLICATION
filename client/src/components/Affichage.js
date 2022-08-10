import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";

import Axios from 'axios';
import "./Affichage.css"


function Affichage_cl() {
    
    const [nom,setnom] = useState('')
    const [prenom,setprenom] = useState('')
    const [CIN,setCIN] = useState('')
    const [email,setemail] = useState('')
    const [ClientList, setClientlist] = useState([])

    

    const deleteClient = (id) => {
        if(window.confirm("Vous etes sures que vous voulez supprimer ce client ?"))
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
    
      }

      useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
          setClientlist(response.data)
        })
      }, [])

    return (
    <div>
        <div className="header">
                <nav>
                    <div className="nav-links">
                    <ul>
                        
                        <li><a href="/">déconnectez-vous</a></li>
                    </ul>
                    </div>
                </nav>
        </div>
        <div className="Liste">

        <h1>Client physique </h1>
        
        
        <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th> 
                    <th>Prenom</th>
                    <th>CIN</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {ClientList.map((item, index) => {
                return (
                    <tr key={item.id} >
                        <th scope="row">{index+1}</th>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.CIN}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className="btn btn-upd">Modifier</button>
                                </Link>
                        
                                <button className="btn btn-del" onClick={() => deleteClient(item.id) }>Supprimer</button>
                               
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-view">Afficher</button>
                                </Link>


                            </td>

                  </tr>
                )
                })}

            </tbody>
        </table>
        <Link to="/addContact">
            <button className="btn btn-contact"> Ajouter un client </button>
        </Link>
  </div></div>
    )
}

export default Affichage_cl;