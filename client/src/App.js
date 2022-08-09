import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration";

import Choose from './pages/choose';
import Affichage_cl from './pages/Affichage';
import AddEdit from './pages/AddEdit';
import View from './pages/view';
import Home from './pages/Home';
function App() {
  return ( 
      <Router>
        <Routes>
          <Route path= '/registration' exact element={<Registration/>} />;
          
          
          <Route  path='/'  element={<Home />} />;
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
