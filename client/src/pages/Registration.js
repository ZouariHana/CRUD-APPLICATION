import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom';


export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameConn, setUsernameConn] = useState('');
    const [passwordConn, setPasswordConn] = useState('');

    const [loginStatus, setLoginStatus] = useState("")
    const [role, setRole] = useState("")

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
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].login);
                setRole(response.data[0].role)
            }
    });}

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true ) {
                setLoginStatus(response.data.user[0].login);
            }
        });
    }, []);
    
  return (
    <div className="App">
        <div className='registration'>
            <h1>Inscription</h1>
            <label> Login : </label>
            <br></br>
            <input type='text' onChange={(event) => setUsername(event.target.value)}/>
            <br></br>
            <label>Mot de passe :</label>
            <br></br>
            <input type='password' onChange={(event) => setPassword(event.target.value)}/>
            <br></br>
            <button className="button2" onClick={register}> Sousmettre</button>

        </div>
        <div className= 'login'>
            <h1>Connexion</h1>
            <input type='text' placeholder='Votre Login' onChange={(event) => setUsernameConn(event.target.value)}></input>
            <br></br>
            <input type='password' placeholder = 'Votre mot de passe' onChange={(event) => setPasswordConn(event.target.value)}></input>
            <br></br>
            <button className= "button2" onClick={connect}>Se connecter</button>      
        </div>
        <h1>{loginStatus}</h1>
        <h1>{role}</h1>
        <Link to="/"><button id='button1'>Page d'acceuil</button></Link> 
    </div>
  )
}
