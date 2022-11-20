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
import Tasks from "./home/tasks"
import { PlannerHome } from './home/plannerhome';


function App() {

  const [showNav, setShowNav] = useState(false);
  const [userId, setUserId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  return (

    <Router>
        <div className = {showNav? "appContainer": "zerowidth"}>
        {   showNav &&
         <NavigationBar userId = {userId} isAdmin = {isAdmin}/>
        }
        <Routes>
        <Route path="/" element={<Login funcNav={setShowNav} setId= {setUserId} setAdmin = {setIsAdmin}/>} />       
        <Route path="/home/config/:userId" element={<Config />}  />
        <Route path="/Registration" element={<Registration />}  />
        <Route path="/home/meeting/:userId" element={<Meetings />} />
        <Route path="/home/createMeeting/:userId" element={<CreateMeeting />} />
        <Route path="/home/tasks/:userId" element={<Tasks />} />
        <Route path="/home/plannerhome/:userId" element={<PlannerHome />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
