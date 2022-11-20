import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import { Login } from './auth/Login';
import { Registration } from './auth/Registration';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route
}   
from 'react-router-dom'; 
import { Meetings } from './home/meetings';
import Home from "./home/home"
import NavigationBar from "./home/navbar"
import Config from "./home/config"
function App() {

  const [showNav, setShowNav] = useState(false);
  return (

    <Router>
        <div className = "container">
        {   showNav &&
         <NavigationBar/>
        }
        <Routes>
        <Route path="/" element={<Login />} />       
        <Route path="/config" element={<Config funcNav={setShowNav}/>}  />
        <Route path="/Registration" element={<Registration funcNav={setShowNav}/>}  />
        <Route path="/teams" element={<Meetings funcNav={setShowNav}/>} />
        
        </Routes>
        </div>
      </Router>
  );
}

export default App;
