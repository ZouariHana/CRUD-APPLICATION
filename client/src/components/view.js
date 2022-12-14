import React, {useState, useEffect} from "react";
import {useParams, Link, useInRouterContext} from "react-router-dom";
import axios from 'axios'
import "./view.css"

function View() {
    
    const {id} = useParams();
    const {type} = useParams();
    
    const[type1, settype1] = useState({});
    const[user, setuser] = useState({});
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/get3/${type}/${id} `)
        .then((resp) => { setuser({...resp.data[0]})
        console.log(resp.data);}
        )
        

    },[type, id])

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => settype1({...resp.data[0]}))
        

    },[type])
    


    return (
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>les détails du client</p>

                </div>
                <div className="anotherContainer">
                    
                    {type1.field1 && 
                    <div>
                    <strong>{type1.field1}: </strong>
                    <span> {user[type1.field1]}</span>
                    <br/>
                    <br/>
                    </div>}
                    {type1.field2 && 
                    <div>
                    <strong>{type1.field2}: </strong>
                    <span> {user[type1.field2]}</span>
                    <br/>
                    <br/>
                    </div>}
                    {type1.field3 && 
                    <div>
                    <strong>{type1.field3}: </strong>
                    <span> {user[type1.field3]}</span>
                    <br/>
                    <br/>
                    </div>}
                    {type1.field4 && 
                    <div>
                    <strong>{type1.field4}: </strong>
                    <span> {user[type1.field4]}</span>
                    <br/>
                    <br/>
                    </div>}
                    {type1.field5 && 
                    <div>
                    <strong>{type1.field5}: </strong>
                    <span> {user[type1.field5]}</span>
                    <br/>
                    <br/>
                    </div>}
                    <strong>Statut: </strong>
                    <span>{user.status}</span>
                    <br />
                    <br />
                    <Link to={`/affichage/${type}`}>
                    <button className="btn btn-edit"> Retour </button>
                    </Link>

                </div>


            </div>

        </div>
    )
}

export default View;