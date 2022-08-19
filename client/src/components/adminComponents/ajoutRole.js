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
      Axios.put(`http://localhost:3001/api/upag/${id}`)
  
    }

    const addAdmin = (id) => {
      if(window.confirm("Etes vous sures que vous voulez ajouter cet admin ?"))
      Axios.put(`http://localhost:3001/api/upad/${id}`)
  
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
                                <button className="btn btn-sup" onClick={() => deleteEmployee(item.id) }>Supprimer </button>
                                { !item.role &&
                                <div>                
                                <button className="btn btn-ajt" onClick={() => addEmployee(item.id) }>Ajouter comme employé</button>
                                <button className="btn btn-ajt" onClick={() => addAdmin(item.id) }>Ajouter comme admin</button>
                                </div> 
                                || item.role=="agent" &&
                                <div><button className="btn btn-ajt" onClick={() => addAdmin(item.id) }>Transformer en admin</button></div>
                                
                                || item.role=="admin" &&
                                <div><button className="btn btn-ajt" onClick={() => addEmployee(item.id) }>Transformer en employé</button></div>
                                
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
