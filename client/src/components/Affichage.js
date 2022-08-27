import React,{useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import Axios from 'axios';
import "./Affichage.css"
import Header from "../pages/Header";

function Affichage_cl() {

    const [ClientList, setClientlist] = useState([])
    const [query, setQuery] = useState('');

    const[type1, settype1] = useState({});
    const {type} = useParams();

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => settype1({...resp.data[0]}))
        

    },[type])
    


      useEffect(() => {
        Axios.get(`http://localhost:3001/api/getClients/${type}?q=${query}`).then((response) => {
          setClientlist(response.data)
        })
      }, [type, query])

      const deleteClient = (id) => {
        console.log(id);
        if(window.confirm("Vous etes sures que vous voulez supprimer ce client ?"))
        Axios.delete(`http://localhost:3001/api/delete2/${id}`).catch((error) => console.log(error))
    
      }

    return (
    <div>
        
        <Header/>
        <input 
            type="search"
            placeholder="Rechercher..."
            onChange={(event) => {
                  setQuery(event.target.value);
            }}
            />
        <div className="Liste">

        <h1> {type1.type} </h1>
        
        
        <table className='table'>
            <thead>
                <tr>
                    <th>{type1.field1}</th>
                    <th>{type1.field2}</th> 
                    <th>{type1.field3}</th>
                    <th>{type1.field4}</th>
                    <th>{type1.field5}</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                {ClientList.map((item, index) => {
                return (
                    <tr key={item.id} >
                        
                            <td>{item[type1.field1]}</td>
                            <td>{item[type1.field2]}</td>
                            <td>{item[type1.field3]}</td>
                            <td>{item[type1.field4]}</td>
                            <td>{item[type1.field5]}</td>
                            <td>{item.status}</td>
                          
                            <td>
                                <Link to={`/update/${type1.type}/${item.id}`}>
                                <button className="btn btn-upd">Modifier</button>
                                </Link>
                        
                                <button className="btn btn-del" onClick={() => deleteClient(item.id) }>Supprimer</button>
                               
                                <Link to={`/view/${type1.type}/${item.id}`}>
                                <button className="btn btn-view">Afficher</button>
                                </Link>

                                <Link to={`/histo/${type1.type}/${item.id}`}>
                                <button className="btn btn-hist">Historique</button>
                                </Link>


                            </td>

                  </tr>
                )
                })}

            </tbody>
        </table>
        <Link to={`/addContact/${type}`}>
            <button className="btn btn-contact"> Ajouter un client </button>
        </Link>
        <Link to={`/showIntegral`}>
            <button className="btn btn-contact"> Afficher tout </button>
        </Link>

  </div></div>
    )
}

export default Affichage_cl;