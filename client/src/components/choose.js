import React from "react";
import {Link} from "react-router-dom";
import "./choose.css"
import img2 from "./img2.jpg"
function Choose() {
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
            <Link to="/affichage">
            <button class="buttons" role="buttons"><span class="text">Client physique</span></button>
            </Link>  
            
            <img src={img2} class="feature-img" />
                
                
            
        </div>


    )
}

export default Choose;
