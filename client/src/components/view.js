import React, {useState, useEffect} from "react";
import {useParams, Link, useInRouterContext} from "react-router-dom";
import axios from 'axios'
import "./view.css"

function View() {
    const[user, setuser] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/get/${id}`)
        .then((resp) => setuser({...resp.data[0]}))
        

    },[id])


    return (
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>les détails du client</p>

                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Nom: </strong>
                    <span>{user.nom}</span>
                    <br />
                    <br />
                    <strong>Prenom: </strong>
                    <span>{user.prenom}</span>
                    <br />
                    <br />
                    <strong>CIN: </strong>
                    <span>{user.CIN}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <Link to="/affichage">
                    <button className="btn btn-edit"> Retour </button>
                    </Link>

                </div>


            </div>

        </div>
    )
}

export default View;