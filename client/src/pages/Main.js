import  Axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Admin from "../components/admin"
import Agent from "../components/agent"
import Initial from "../components/initial"


export default function Main() {
  
  Axios.defaults.withCredentials = true ;

  const [role, setRole] = useState("")
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn== true){
        setRole(response.data.user[0].role);      }
    })
  }, [])
  return (<div>{  role === "" && <Initial/> } { role === "admin" && <Admin/> } {role === "agent" && <Agent/>}</div> 

  )
}
