import React, {useState,useEffect} from 'react';
import {Outlet, Navigate} from "react-router-dom";
import axios from 'axios';
import Registration from './pages/Registration';

function ProtectedRoutes() {
    const [login1, setlogin1] = useState(false);
    
  
    
      axios.get("http://localhost:3001/login").then((response) => {
        setlogin1(response.data.loggedIn)
         
      });
    

  return (
    
    
    login1 ? <Outlet /> : <Registration />
    
  ) 
      
 
}

export default ProtectedRoutes;
