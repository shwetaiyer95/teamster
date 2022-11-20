import React, { useState } from "react";
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
export function Login({funcNav,setId, setAdmin}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const routeChange = (path) =>{
        navigate(path)
    }
    const HOST = "http://127.0.0.1:5000";
    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
          };
        Axios.post(`${HOST}/login`, {email:email, password: password})
        .then((response) => {
          funcNav(true)
          setId(response.data.userid)
          if(response.data.usertype == "admin"){
            setAdmin(true)
            console.log(response.data.userid)
            routeChange(`/home/config/${response.data.userid}`)
          }
          else{
            console.log(response.data.userid)
            routeChange(`/home/createMeeting/${response.data.userid}`)
          }
          
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
                alert("User not found with the given email or password")
            }else {
              alert("An error occured, please log in again!")
            }
          })
        e.target.reset();
    }

    return (
        <div className="Auth">
        <div className="auth-container">
            <h1>Teamster</h1>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter email" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => routeChange("/Registration")}>Don't have an account? Register here.</button>
        </div>
        </div>
    )
}
export default Login;