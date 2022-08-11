import React from 'react'
import { Link } from 'react-router-dom'
import "./initial.css"
import img1 from "./img1.jpg"

export default function Initial () {  
  return (
  <div>
      <div className="header">
          <nav>
            <div className="nav-links">
              <ul>
                        
              <li><a href="/registration">Connectez-vous</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="content">
            <h1>La relation <br/>client</h1>
            <p>La relation client décrit la manière dont <br/>une entreprise  
                s'engage <br/> et interagit auprès de ses clients pour  <br/> 
                améliorer l'expérience client. <br/>
            Développer cette relation est 
            l'une <br/>des stratégies les plus efficaces <br/> que notre entreprise cherche  <br/> à développer.
            </p>
            
              <img src={img1} class="feature-img" />
            
            
        </div>
    </div>
  )
}
