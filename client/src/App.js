import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";
import AjoutType from "./components/adminComponents/AjoutType"
import ProtectedRoutes from './ProtectedRoutes';

import Affichage_cl from './components/Affichage';
import AffichageTotal from './components/AffichageTotal';
import AddEdit from './components/AddEdit';
import View from './components/view';
import Main from './pages/Main';
import Initial from './components/initial';

import Choose from './components/choose';
import ChooseType from './components/ChooseType';
import Admin from './components/admin';
import AjoutStatut from './components/adminComponents/AjoutStatut';
import AjoutRole from './components/adminComponents/ajoutRole';
import Historique from './components/contactComponents/Historique';
import AddRep from './components/contactComponents/addRep';


function App() {
  return ( 
      <Router>
        <Routes>
          <Route path= '/registration'  element={<Registration/>} />;
          <Route  path='/'  element={<Initial />} />;
          <Route  path='/main'  element={<Main />} />;
        <Route element={<ProtectedRoutes />} >

          <Route path= '/Admin'  element={<Admin/>} />
          <Route  path='/showIntegral'  element={<AffichageTotal />} />;
          <Route  path='/choose'  element={<Choose />} />;
          <Route  path='/chooseType'  element={<ChooseType />} />;
          
          <Route  path='/affichage/:type'  element={<Affichage_cl />} />;
          <Route  path='/addcontact/:type'  element={<AddEdit />} />;
          <Route  path='/update/:type/:id'  element={<AddEdit />} />;
          <Route  path='/view/:type/:id'  element={<View />} />;
          <Route  path='/addType'  element={<AjoutType />} />;
          <Route  path='/addStatus'  element={<AjoutStatut/>} />;
          <Route  path='/addRole'  element={<AjoutRole/>} />;
          <Route  path='/histo/:type/:id'  element={<Historique/>} />;
          <Route  path='/rep/:id'  element={<AddRep/>} />;
        </Route>

        </Routes>
      </Router> 
    );
 
}

export default App;
