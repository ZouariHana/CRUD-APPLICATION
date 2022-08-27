import axios from "axios";
import "./choose.css"
import img2 from "./img2.jpg"
import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Header from "../pages/Header";

function ChooseType() {
    axios.defaults.withCredentials = true ;
    const [typelist, settypelist] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/api/get1").then((response) => {
            settypelist(response.data)
        })
      }, [])
    return (
        <div>
            
            <Header/>    
            <tbody>
                {typelist.map((item, index) => {
                return (
                    <dl key={item.id} >
                        
                        <dl>
                            <Link to={`/addContact/${item.type}`}>
                            <button class="buttons" role="buttons"><span class="text">{item.type}</span></button>
                            </Link>  
                        </dl>

                    </dl>
                )
                })}

            </tbody>
            <img src={img2} class="feature-img" />
                
                
            
        </div>)
}

export default ChooseType;