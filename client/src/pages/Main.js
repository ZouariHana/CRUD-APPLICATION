import  Axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Admin from "../components/admin"
import Choose from '../components/choose'
import EnAttente from '../components/EnAttente'


export default function Main() {
  
  Axios.defaults.withCredentials = true ;

  const [role, setRole] = useState("")
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn=== true){
        setRole(response.data.user[0].role);      }
    })
  }, [])
  return (
  <div>{  role === "" && <EnAttente/> } { role === "admin" && <Admin/> } {role === "agent" && <Choose/>}</div> 

  )
}
