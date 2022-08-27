import React,{useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import "./Affichage.css"
import Header from "../pages/Header";


function AffichageTotal() {
        
    
    const [ClientList, setClientlist] = useState([]);
    const [query, setQuery] = useState('');
    const [fieldList, setFieldList] = useState([]);
    useEffect(
        () => { 
         Axios.get(`http://localhost:3001/api/getFields`)
           .then((resp) => {
             let columns =[]
             console.log(resp.data);
             for (let i = 0 ; i< resp.data.length ; i++){
               columns[i] = resp.data[i].COLUMN_NAME;
             }
             setFieldList(columns);
     
         })}, []
         );


    const deleteClient = (id) => {
      console.log(id);
      if(window.confirm("Vous etes sures que vous voulez supprimer ce client ?"))
      {Axios.delete(`http://localhost:3001/api/delete2/${id}`).catch((error) => console.log(error))}
  
    }
    
      useEffect(
         () => { 
          Axios.get(`http://localhost:3001/api/getClients?q=${query}`)
            .then((resp) => {setClientlist(resp.data)
          })} ,[query]
          );

  console.log(ClientList);
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
     
            <table className='table'>
              <thead>
                <tr>
                  { fieldList.map((item, index) => {
                    return (
                      <th>{item}</th>
                   )})}
                </tr> 
              </thead>
              <tbody>

        {ClientList.map((item, index) => {
                return (
                  <tr key={item.id} > 
                  {fieldList.map((field,i) => {
                    return(
                      <td>{item[field]}</td>
                    )
                  })}
                    <td>
                      <Link to={`/update/${item.type}/${item.id}`}>
                          <button className="btn btn-upd">Modifier</button>
                      </Link>
                      <button className="btn btn-del" onClick={() => deleteClient(item.id) }>Supprimer</button>
                      <Link to={`/view/${item.type}/${item.id}`}>
                                <button className="btn btn-view">Afficher</button>
                      </Link>
                      <Link to={`/histo/${item.type}/${item.id}`}>
                                <button className="btn btn-hist">Historique</button>
                                </Link>


                    </td>


                  </tr>
                )
                })}

            </tbody>

          </table> 
          <Link to={`/chooseType`}>
            <button className="btn btn-contact"> Ajouter un client </button>
          </Link>
          <Link to={`/choose`}>
            <button className="btn btn-contact"> Afficher par type</button>
          </Link>

     </div>   
    </div>
  )
}

export default AffichageTotal