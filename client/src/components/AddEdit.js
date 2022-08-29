import React,{useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import "./AddEdit.css";
import Axios from "axios";

import Header from "../pages/Header";

function AddEdit() {
  
    const [status, setStatus] = useState('')
    const [ClientList, setClientlist] = useState([])
    const [statusList, setStatusList] = useState([]);
    const [fieldContent, setFieldContent] = useState([]);
    const [fieldContent2, setFieldContent2] = useState([]);
    const [ClientList2, setClientlist2] = useState([]);
    const [fieldList, setFieldList] = useState([]);

    
    const navigate = useNavigate();
    const[type1, settype1] = useState({});

    const {id} = useParams();
    const {type} = useParams();

    Axios.get("http://localhost:3001/api/getStatus").then((response) => {
        setStatusList(response.data);
    })

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get3/${type}/${id}`)
        .then((resp) =>  {
            console.log(resp.data);
            if (resp.data.length>0) {
            const list = Object.values(resp.data[0]).filter((value) => value !== null)
            list.shift();
            list.shift();
            setFieldContent(list);}
           
        })
        

    },[type, id])
    
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/get/${type}`)
        .then((resp) => {settype1({...resp.data[0]})
        
    }
      )
        
        

    },[type])

    useEffect(
        () => { 
        Axios.get(`http://localhost:3001/api/getClients`)
        .then((resp) => {setClientlist2(resp.data)
        })}, []);
    useEffect(
         () => { 
          Axios.get(`http://localhost:3001/api/getFields`)
            .then((resp) => {
              let columns =[]
              console.log(resp.data);
              for (let i = 0 ; i< resp.data.length ; i++){
                columns[i] = resp.data[i].COLUMN_NAME;
              }
              setFieldList(columns);
      
          })}, []
          );

         
    const addClient = (e) => {
        console.log(ClientList2)
        let fields = Object.values(type1).filter((value) => value !== null);
        fields.shift();
        fields.shift();
        console.log(fieldList);

        
        const newClient = {}
        e.preventDefault();
        /*if(!nom || !prenom || !CIN || !email){
            alert("veuillez remplir tous les champs")
        }*/
        //else{
  


            if (!id) {
                if (fieldContent2.length < fields.length) {alert("Veuillez remplir tous les champs")}
                else {
                Axios.all([
                    Axios.post(`http://localhost:3001/api/insertIntegral/${type}`,{
                        fieldContent: fieldContent2,
                        fieldList : fields
                    })
                    // ,
                    // Axios.post(`http://localhost:3001/api/insert/${type}`,{
                    //     fieldContent: fieldContent2,
                    // })
                ])
                alert("Un nouveau client est ajouté")
            }

                // newClient[fieldList[0]] = type;
                // for (let i=1 ; i<fieldContent2.length; i++) {
                //     newClient[fieldList[i]] = fieldContent2[i];
                // }
    
                // setClientlist2([...ClientList2, newClient])
                
                
                
            }

            else{
                Axios.put(`http://localhost:3001/api/update/${type}/${id}`,{
                    fieldContent: fieldContent,
                    fieldList : fields
                });

                // for (let i=0 ; i<fieldContent.length; i++) {
                //     newClient[fieldList[i]] = fieldContent[i];
                // }
    
                // setClientlist2([...ClientList2, newClient])
                
               
                
                alert("les données sont changées avec succés")
            

            //}
            
        
      }}
      let fields = Object.values(type1);
        fields.shift();
        fields.shift();

    return (
        <div>
        
        <Header/>
        
        <div className="formulaire" >
            <h1 >Ajout d'un client</h1>
            <form style={{
                   margin: "auto",
                   padding:"15px",
                   aligncontent: "center",
                  
                   
            }}
            onSubmit={addClient}>



                {
                    fields.map((item, index) => {
                        let str = 'field' + String(index+1)
                        let list = fieldContent;
                        let list2 = fieldContent2;
    
                        return(
                            <div>
                                {item &&
                                <div>
                                <label>{item}</label>
                                <input
                                    type="text"
                                    value={list[index+1] || ""}
                                    onChange={(event) =>{
                                        list[index+1] = event.target.value;
                                        list2[index] = event.target.value;
                                        setFieldContent(list);
                                        setFieldContent2(list2);
                                        console.log(list)
                                    }}
                                    />
                                </div> }
                            </div>
                        )
                    })
                }

            <label>Statut</label>
            <select name="clientStatus" /*id={clientStatus}*/ onChange={(event) => {
                let list = fieldContent;
                let list2 = fieldContent2
                list[0] = event.target.value ; 
                list2.unshift(event.target.value);
                console.log(list2);
                console.log(list);
                setFieldContent(list);
                setFieldContent2(list2);

            }}>
            <option value="blank"></option>  
              {statusList.map((item, index) => {
                return(
                    <option>{item.status}</option>
                )
              })}
            </select>

                <input type="submit" value={id ? "Modifier" :"Sauvegarder"} />
                {/* <Link to={`/affichage/${type}`}> */}
                <Link to= {-1}>
                    <input type="button" value="Retour" />
                </Link>
                {/* <button onClick={() => {navigate(-1)}}>Retour</button> */}

            </form>
        </div>
        </div>
    )
}

export default AddEdit;