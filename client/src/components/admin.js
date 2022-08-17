import React from 'react'
import {Link} from "react-router-dom";
import "./choose.css"
import img5 from "./img5.jpg"
import Header from '../pages/Header';
export default function Admin() {
  
  return (
    <div>

            <Header/>
            <div className='btnss'>
            <Link to="/addType">
            <button class="buttons" role="buttons"><span class="text">Ajout d'un type de client</span></button>
            </Link>  
            <Link to="/addStatus">
            <button class="buttons" role="buttons"><span class="text">Ajout d'un statut</span></button>
            </Link>
            <Link to="/addRole">
            <button class="buttons" role="buttons"><span class="text">Gestion des employés</span></button>
            </Link>   
            <Link to="/choose">
            <button class="buttons" role="buttons"><span class="text">Gestion des clients</span></button>
            </Link>  
            </div>
            <img src={img5} class="feature-img" />
    </div>
    
  )
}
