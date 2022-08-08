import React from 'react'
import { Link } from 'react-router-dom'

export default function initial () {  
  return (
  <div>
        <h1>Hello World!</h1>
        <Link to="/registration"><button className='button2'>Connexion/Inscription</button></Link>
    </div>
  )
}
