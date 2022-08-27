import React, {useState} from 'react';
import Axios from "axios";
import "./AjoutType.css"
import { Link } from 'react-router-dom';
import Header from '../../pages/Header';
export default function Admin() {
  const [table , setTable] = useState("");

  const [typeFields, setTypeFields] = useState([{field : ''}]);

  Axios.defaults.withCredentials = true ;


  // const [fieldList, setFieldList] = useState([]);
  // useEffect(
  //   () => { 
  //    Axios.get(`http://localhost:3001/api/getFields`)
  //      .then((resp) => {
  //        let columns =[]
  //        console.log(resp.data);
  //        for (let i = 0 ; i< resp.data.length ; i++){
  //          columns[i] = resp.data[i].COLUMN_NAME;
  //        }
  //        setFieldList(columns);
 
  //    })}, []
  //    );

  const fillClientTypesTable = () => {
    Axios.post("http://localhost:3001/api/fill", {
      table : table,
      typeFields : typeFields

    }).then((response) => {
      alert(response.data);
    });
  }

  const alterClientsTable = () => {

    Axios.post("http://localhost:3001/api/alter", {
      table : table,
      typeFields : typeFields,

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
    
    <Header/>  
    <div className='body1'>
    <div className='instructions'>
                <h2>- Ne laissez pas de champ(s) vides(s) quand vous appliquez. <br/>
                -Les noms des champs ne doivent pas contenir d'espace entre les mots.<br/>
                -Appuyer sur "Appliquez" pour enregistrer le nouveau type.</h2>
    </div>

    <div id ="AjoutType">
         <input type="text" placeholder='Type de client' 
            onChange={(event) => {
            setTable(event.target.value)
            }}>
          </input>
                  
          <button className='buttons1' onClick={() => {
              if (table !== "") {
                  setIsShown(true);
                  /*createEmployeeTable();*/
                } 
              else {
                  alert("Veuillez tapez un nouveau type")
                  }
              }}>Ajouter un type
          </button>
    </div>

        { isShown && 
          <div id ="AjoutChamps">
            <form className="App1" autoComplete="off">
              <div className="form-field">
                    <label htmlFor="service">Champ(s)</label>

                      {typeFields.map((certainType, index) => (
                        <div key ={index} className="clientTypes">
                            <div className="first-division">
                                <input name="clientType" type="text" id="clientType" required onChange={ (e) => {
                                  handleClientChange(index, e.target.value);
                                }}/>
                                  
                                {typeFields.length - 1 == index && typeFields.length < 5 &&
                                <button type="button" className="buttons1" onClick={ () => {
                                    handleClientAdd();
                                }}>
                                  <span>Ajouter une caractéristique</span>
                                </button>}

                            </div>

                            <div className="second-division">
                                { typeFields.length > 1 &&
                                <button type="button" className="buttons1" onClick={(e) => {
                                    handleClientRemove(index);
                                }}>
                                  <span>Supprimer</span>
                                </button>}
                            </div>
                        </div>
                      ))};
              </div>
            </form>
          </div>
          
        }<div className='but'>
          <button type='button' className='buttons1'  onClick={() => {
          fillClientTypesTable();
          alterClientsTable();
          }}>Appliquez</button>
        </div>
        </div> 

        
    
    

  </div>
  )
}