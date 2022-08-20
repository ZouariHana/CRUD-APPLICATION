import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import "./Header.css"
import axios from 'axios';

export default function Header() {

  const [login, setlogin] = useState(false);
  
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      setlogin(response.data.loggedIn)
       
  });
}, []);

  const logout = () => {
    axios.get("http://localhost:3001/logout")
    .then((response => {
        console.log(response);
        setlogin(response.data.loggedIn)
    }))
}
  
  return (
    
       <div className="header">
                    <nav>
                        <div className="nav-links">
                        <ul>
                            <li><a href="/">Home</a></li>
                            {login == false &&
                            <li><a href="/registration">connectez-vous</a></li>
                        
                            }
                             {login == true &&   
                            
                            <li ><Link to={`/registration`}><button class='btnnn' onClick={logout}>déconnectez-vous</button></Link></li>
                          }
                        </ul>
                        </div>
                    </nav>
            </div> 
            
    
  )
}

