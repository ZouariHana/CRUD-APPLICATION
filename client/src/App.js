import './App.css';
// import React, {useState, useEffect} from "react"; 
import React from 'react';
import Axios from 'axios'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
function App() {
  
  // const [nom, setNom] = useState("");
  // const [gouvernorat, setGouvernorat] = useState("");
  // const [clientmoralList, setclientmoralList] = useState([]);

  // useEffect(() => {
  //   Axios.get('http://localhost:3001/api/get').then( (response) => {
  //     setclientmoralList(response.data);}
  //   )
  // }, [])
  // const submitClient = ()=>{
  //     Axios.post("http://localhost:3001/api/insert", {
  //       nom: nom, 
  //       gouvernorat: gouvernorat
  //     })
  //     setclientmoralList([...clientmoralList, {nom : nom, gouvernorat: gouvernorat}]);

    // }
  return ( 
      <Router>
        <Routes>
          <Route path= '/registration' exact element={<Registration/>} />;
          <Route path= '/' element={<Main/>} />;
        </Routes>
      </Router> 
    );
  // return (
  //   <div className="App">
  //       <h1>CLIENT PERSONNE MORALE</h1>
  //       <div className='form'>

  //       <label>Nom de l'entreprise</label><br></br>
  //       <input type='text' name='nom' placeholder="Nom de l'entreprise" onChange={(e)=>{
  //         setNom(e.target.value);
  //       }} ></input>
  //       <label>Gouvernorat</label><br></br>
  //       <input type='text' name='gouvernorat' placeholder="Gouvernorat" onChange={(e)=>{
  //         setGouvernorat(e.target.value);}}></input>

  //       <button onClick={submitClient}>Ajouter le Client</button>
        
     
  //       {
  //         clientmoralList.map((val) => {
  //           return (
  //           <div className="card">
  //             <div>
  //               <h1> {val.nom}  </h1> 
  //               <p> {val.gouvernorat} </p>
  //             </div>
  //             <div>
  //               <button>Modifier</button>
  //               <input type="text"></input>
  //             </div>  
  //           </div> )
  //         } )
  //       }

        
  //       </div>
  //   </div>
  // );
}

export default App;
