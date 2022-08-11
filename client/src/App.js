import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";

import Choose from './components/choose';
import Affichage_cl from './components/Affichage';
import AddEdit from './components/AddEdit';
import View from './components/view';
import Main from './pages/Main';
import Initial from './components/initial';
function App() {
  return ( 
      <Router>
        <Routes>
          <Route path= '/registration'  element={<Registration/>} />;
          
          <Route  path='/'  element={<Initial />} />;
          <Route  path='/main'  element={<Main />} />;
          <Route  path='/choose'  element={<Choose />} />;
          <Route  path='/affichage'  element={<Affichage_cl />} />;
          <Route  path='/addcontact'  element={<AddEdit />} />;
          <Route  path='/update/:id'  element={<AddEdit />} />;
          <Route  path='/view/:id'  element={<View />} />;

        </Routes>
      </Router> 
    );
 
}

export default App;
