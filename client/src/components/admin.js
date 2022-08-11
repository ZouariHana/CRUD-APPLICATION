import React from 'react'
import {Link} from "react-router-dom";
import "./choose.css"
import img5 from "./img5.jpg"
export default function Admin() {
  return (
    <div>
       <div className="header">
                    <nav>
                        <div className="nav-links">
                        <ul>
                            
                            <li><a href="/">déconnectez-vous</a></li>
                        </ul>
                        </div>
                    </nav>
            </div> 
            <div className='btnss'>
            <Link to="">
            <button class="buttons" role="buttons"><span class="text">Ajout d'un type de client</span></button>
            </Link>  
            <Link to="">
            <button class="buttons" role="buttons"><span class="text">Ajout d'un statut</span></button>
            </Link>  
            <Link to="/choose">
            <button class="buttons" role="buttons"><span class="text">gestion des clients</span></button>
            </Link>  
            </div>
            <img src={img5} class="feature-img" />
    </div>
    
  )
}
