import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import './Registration.css'

//import { Link } from 'react-router-dom';
import Header from './Header';
export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameConn, setUsernameConn] = useState('');
    const [passwordConn, setPasswordConn] = useState('');

    const [loginStatus, setLoginStatus] = useState("")
    const [role, setRole] = useState("")

    const [msg, setmsg] = useState("")

    const navigate = useNavigate()
    Axios.defaults.withCredentials = true ;

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            user: username, 
            pwd : password
        }).then((response => {
            console.log(response);
        }))
    }
    const connect = () => {
        Axios.post("http://localhost:3001/login", {
            userConn : usernameConn,
            pwdConn: passwordConn 
        }).then( (response) => {
            console.log(response)
            setmsg("")
            if (response.data.message) {
                alert(response.data.message);
                
            } 
            else {
                setLoginStatus(response.data[0].login);
                setRole(response.data[0].role)
                console.log(response.data[0].role)
                if ( response.data[0].role === null ){
                    alert("Vous n'êtes pas encore accordé d'accés.")
                    setmsg("")
                   
                }
                else{
                    
                    navigate("/main")
                    
                }
                
               
            }
    });}

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
           if(response.data.loggedIn === true ) {
               setLoginStatus(response.data.user[0].login);
           }
      });
    }, []);
    
  return (
    <div className="App">
        
        <Header/>
        <div className="body">
            
            <h2>Si vous êtes un nouveau employé vous pouvez s'inscrire pour que l'admin puisse vous accorder l'accès aux données des clients<br/>
            Une fois vous aurez l'accès vous pouvez vous connecter en remplissant les champs ci dessous! (inscription)<br/>
            NB : Les autres employés ne sont pas concernés que par les champs connexion !
            </h2>
                <div className='container1'>
                    <div className='contact-box'>
                        <div className="left"></div>
                        <div className="right">
                            <h1>Inscription</h1>
                            <label> Login : </label>
                        
                            <input type='text' class="field" onChange={(event) => setUsername(event.target.value)}/>
                            
                            <label>Mot de passe :</label>
                            
                            <input type='password'class="field" onChange={(event) => setPassword(event.target.value)}/>
                            
                            <button className="btn1" onClick={register}> Sousmettre</button>
                        
                            <h1>Connexion</h1>
                            <input type='text' class="field" placeholder='Votre Login' onChange={(event) => setUsernameConn(event.target.value)}/>
                            <input type='password'class="field" placeholder = 'Votre mot de passe' onChange={(event) => setPasswordConn(event.target.value)}/>
                            <button class= "btn1" onClick={connect}>Se connecter</button> 
                        </div>
                    </div>
                </div>
                <h3><a href="/main">{msg}{role}</a></h3>
                <br/>
            
           
        </div>
         
    </div>
  )
}
