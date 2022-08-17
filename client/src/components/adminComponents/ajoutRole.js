import React, {useState,useEffect} from 'react'
import Axios from "axios";
import "./ajoutRole.css"
import { Link } from 'react-router-dom';
import Header from '../../pages/Header';
export default function AjoutRole() {
  const [EmpList, setEmpList] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getEmp`).then((response) => {
      setEmpList(response.data)
    })
  }, [])


  
    const addEmployee = (id) => {
      if(window.confirm("Etes vous sures que vous voulez ajouter cet employé ?"))
      Axios.put(`http://localhost:3001/api/up/${id}`)
  
    }


    const deleteEmployee = (id) => {
      if(window.confirm("Etes vous sures que vous voulez supprimer cet employé ?"))
      Axios.delete(`http://localhost:3001/api/del/${id}`)
  
    }
  
  return (
    
    <div>
    
    <Header/>
    <div className='page' >
    <div className='choisir'>
      <h1>Liste des employés</h1>
      <br/>
      <table className='table1'>
            <thead>
                <tr>
                    <th>Employé(s)</th>
                    <th>Role</th> 
                    
                </tr>
            </thead>
            <tbody>
                {EmpList.map((item, index) => {
                return (
                    <tr key={item.id} >
                        
                            <td>{item.login}</td>
                            <td>{item.role}</td>
                           
                            <td>
                                { !item.role &&
                                <div>
                               
                                <button className="btn btn-sup" onClick={() => deleteEmployee(item.id) }>Supprimer l'employé</button>
                                <button className="btn btn-ajt" onClick={() => addEmployee(item.id) }>ajouter comme employé</button>
                                </div> 
                                || item.role=="agent" &&
                                <button className="btn btn-sup" onClick={() => deleteEmployee(item.id) }>Supprimer l'employé</button>
                                }

                            </td>

                  </tr>
                )
                })}

            </tbody>
        </table>
      </div> 

    </div>
    </div>
  )
}
