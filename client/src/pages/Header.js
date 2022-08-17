import React from 'react'
import {Link} from "react-router-dom";
import "./Header.css"

export default function Header() {
  
  return (
    
       <div className="header">
                    <nav>
                        <div className="nav-links">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/registration">connectez-vous</a></li>
                            
                        </ul>
                        </div>
                    </nav>
            </div> 
            
    
  )
}
