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
import { CreateMeeting } from './home/createMeeting';


function App() {

  const [showNav, setShowNav] = useState(false);
  return (

    <Router>
        <div className = {showNav? "container": "zerowidth"}>
        {   showNav &&
         <NavigationBar/>
        }
        <Routes>
        <Route path="/" element={<Login funcNav={setShowNav}/>} />       
        <Route path="/home/config" element={<Config />}  />
        <Route path="/Registration" element={<Registration />}  />
        <Route path="/home/teams" element={<Meetings />} />
        <Route path="/home/createMeeting" element={<CreateMeeting />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
