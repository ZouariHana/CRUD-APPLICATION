import React from "react";
import {Link} from "react-router-dom";
import "./EnAttente.css"
import img4 from "./img4.jpg"
function EnAttente() {
    return (
        <div>
            <div className="header">
                <nav>
                    <div className="nav-links">
                    <ul>
                        
                        <li><a href="/">Home </a></li>
                    </ul>
                    </div>
                </nav>
            </div>

        <div className="content">
        <p>Vous n'avez pas encore l'accés ! <br/>
        veuillez attendre, s'il vous plait,<br/> jusqu'a l'admin vous accorde l'accés !
        </p>
        </div>
          <img src={img4} class="feature-img" />
        
        
    </div>


    )
}

export default EnAttente;
