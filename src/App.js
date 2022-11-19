import logo from './logo.svg';
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


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Registration" element={<Registration/>}  />
          <Route path="/teams" element={<Meetings/>} />
        </Routes>
      </Router>
  );
}

export default App;
