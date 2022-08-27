import  Axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Admin from "../components/admin"
import AffichageTotal from '../components/AffichageTotal';
// import Choose from '../components/choose'


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
  <div> {role === "admin" && <Admin/> }{role === "agent" && <AffichageTotal/>}</div> 

  )
}
