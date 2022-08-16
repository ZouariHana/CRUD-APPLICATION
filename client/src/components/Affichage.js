import React,{useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import Axios from 'axios';
import "./Affichage.css"


function Affichage_cl() {
    
    const [car1,setcar1] = useState('')
    const [car2,setcar2] = useState('')
    const [car3,setcar3] = useState('')
    const [car4,setcar4] = useState('')
    const [car5,setcar5] = useState('')

 

    const [ClientList, setClientlist] = useState([])

    const[type1, settype1] = useState({});
    const {type} = useParams();

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => settype1({...resp.data[0]}))
        

    },[type])
    

    const deleteClient = (id) => {
        if(window.confirm("Vous etes sures que vous voulez supprimer ce client ?"))
        Axios.delete(`http://localhost:3001/api/delete/${type}/${id}`)
    
      }

      useEffect(() => {
        Axios.get(`http://localhost:3001/api/get2/${type}`).then((response) => {
          setClientlist(response.data)
        })
      }, [type])

    return (
    <div>
        <div className="header">
                <nav>
                    <div className="nav-links">
                    <ul>
                        <li><a href="/choose">Rentrez à la page principale</a></li>
                        <li><a href="/">déconnectez-vous</a></li>
                        

                    </ul>
                    </div>
                </nav>
        </div>
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
                        
                            <td>{item.car1}</td>
                            <td>{item.car2}</td>
                            <td>{item.car3}</td>
                            <td>{item.car4}</td>
                            <td>{item.car5}</td>
                            <td>{item.status}</td>
                          
                            <td>
                                <Link to={`/update/${type1.type}${item.id}`}>
                                <button className="btn btn-upd">Modifier</button>
                                </Link>
                        
                                <button className="btn btn-del" onClick={() => deleteClient(item.id) }>Supprimer</button>
                               
                                <Link to={`/view/${type1.type}/${item.id}`}>
                                <button className="btn btn-view">Afficher</button>
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

  </div></div>
    )
}

export default Affichage_cl;