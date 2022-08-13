import React, {useState} from 'react';
import Axios from "axios";
import "./AjoutType.css"
import { Link } from 'react-router-dom';

export default function Admin() {
  const [table , setTable] = useState("");

  const [clientTypes, setClientTypes] = useState([{clientType : ''}]);

  const [typeFields, setTypeFields] = useState([{field : ''}]);

  Axios.defaults.withCredentials = true ;

  const fillClientTypesTable = () => {
    Axios.post("http://localhost:3001/api/fill", {
      table : table,
      typeFields : typeFields

    }).then((response) => {
      console.log(response.data);
    });
  }
  const createClientTypeTable = () => {
    Axios.post("http://localhost:3001/api/create", {
      table : table,
      typeFields : typeFields

    }).then((response) => {
      console.log(response.data);
      alert(response.data);
    });
    
  }  


  console.log(typeFields);

  const handleClientAdd = () => {
    setTypeFields([...typeFields, {field :''}]);
  }
  const handleClientRemove = (index) => {
    setTypeFields([...typeFields, {field : ''}] )
    const list = [...typeFields];
    list.splice(index,1);
    setTypeFields([...list]);
  }
  const handleClientChange = (index, val) => {
    typeFields[index].field = val ;
  }

  const [isShown, setIsShown] = useState(false);


//   );
// }
  return(
  <div>
    <h2>- Ne laissez pas de champ(s) vides(s) quand vous appliquez</h2>
    <h2>-Les noms des champs ne doivent pas contenir d'espace entre les mots</h2>
    <h2>- Appuyer sur "Appliquez" pour enregistrer le nouveau type</h2>
    <div id ="AjoutType">
      <input type="text" placeholder='Type de client' onChange={(event) => {
          setTable(event.target.value)
            }}></input>
        <button onClick={() => {
        if (table !== "") {
        setIsShown(true);
        /*createEmployeeTable();*/} else {
          alert("Veuillez tapez un nouveau type")
        }
          }}>Ajouter un type
        </button>
    </div>
    { isShown && 
    <div id ="AjoutChamps">
    <form className="App" autoComplete="off">
    <div className="form-field">
      <label htmlFor="service">Champ(s)</label>

    {typeFields.map((certainType, index) => (
      <div key ={index} className="clientTypes">
       <div className="first-division">
         <input name="clientType" type="text" id="clientType" required onChange={ (e) => {
           handleClientChange(index, e.target.value);
         }}/>
          
         {typeFields.length - 1 == index && typeFields.length < 5 &&
         <button type="button" className="add-btn" onClick={ () => {
             handleClientAdd();
         }}>
           <span>Ajouter une caractéristique</span>
         </button>}
       </div>
       <div className="second-division">
         { typeFields.length > 1 &&
         <button type="button" className="remove-btn" onClick={(e) => {
             handleClientRemove(index);
         }}>
           <span>Remove</span>
         </button>}
       </div>
     </div>
))};
   </div>
 </form>
 </div> }
 <button type='button' className='apply-btn' onClick={() => {
    createClientTypeTable();
    fillClientTypesTable();
 }}>Appliquez</button>
 <Link to="/main"><button> Page principal</button></Link>
 
 </div>
  )
}