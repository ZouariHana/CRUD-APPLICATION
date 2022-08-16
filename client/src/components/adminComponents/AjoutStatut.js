import React, {useState} from 'react'
import Axios from "axios";
// import "./AjoutStatut.css"
import { Link } from 'react-router-dom';

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
      <div className="header">
            <nav>
                <div className="nav-links">
                 <ul>
                    <li><Link to ="/main">Page principale</Link></li>
                    <li><Link to="/">déconnectez-vous</Link></li>
                </ul>
                </div>
            </nav>
      </div>
    <div className='pageBody'>
        <div className='addStatus'>
            <input placeholder='Ajouter un statut' onChange={(event) => {
                setStatus(event.target.value);
            }}></input>
            <button className='buttons1' onClick={() => {
                addStatus();
            }}>Appliquez</button>
        </div>
        <div className='show'>
        <h1>Output</h1>
        { statusList.map((item, index) => {
            return(
                <div>
                    <h1>{item.status}</h1>
                    <button className='buttons1' onClick ={ () => {
                        deleteStatus(item.id);
                    }}>Supprimer</button>
                </div>
            ) 
        })}    
        </div> 
    </div>
    </div>
  )
}
