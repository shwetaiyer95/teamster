import logo from './logo.svg';
import './App.css';
import { Login } from './auth/Login';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Switch,
  Redirect  
}   
from 'react-router-dom'; 


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
  );
}

export default App;
