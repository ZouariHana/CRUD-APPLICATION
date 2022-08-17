import React, {useState} from 'react'
import Axios from "axios";
import "./AjoutStatut.css"
import { Link } from 'react-router-dom';
import Header from '../../pages/Header';
export default function AjoutStatut() {
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState([]);
  const addStatus = () => {
    Axios.post("http://localhost:3001/api/addStatus", {
        status : status
  
      }).then((response) => {
        console.log(response.data);
      });
  }
  const deleteStatus = (id) => {
    if(window.confirm("Vous etes sures que vous voulez supprimer ce statut ?"))
        Axios.delete(`http://localhost:3001/api/deleteStatus/${id}`)
  }
  Axios.get("http://localhost:3001/api/getStatus").then((response) => {
    setStatusList(response.data);
  })
  return (
    <div>
      
      <Header/>
    <div className='pageBody'>
        <div className='addStatus'>
            <input type="ajout" placeholder='Ajouter un statut' onChange={(event) => {
                setStatus(event.target.value);
            }}></input>
            <button className='buttons1' onClick={() => {
                addStatus();
            }}>Appliquez</button>
        </div>
        <div className='show'>
      <table>
        { statusList.map((item, index) => {
            return(
                <div>
                    <td><h1>{item.status}</h1></td>
                    <td><button className='buttons1' onClick ={ () => {
                        deleteStatus(item.id);
                    }}>Supprimer</button></td>
                </div>
            ) 
        })} </table>   
        </div> 
    </div>
    </div>
  )
}
