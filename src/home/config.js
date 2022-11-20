import React, { useEffect, useState } from "react";
import CardComponent from "./cardComponent"
import Axios from "axios"
import "./cardComponent.css"
import { Button, Form, FormCheck, Modal } from 'react-bootstrap';
const Config = ({title, subtitle, text, links}) => {
    const [showUserCreate, setShowUserCreate] = useState(false);
    const [showTeamCreate, setShowTeamCreate] = useState(false);
    const [showWorkPermission, setShowWorkPermission] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [timezone, setTimeZone] = useState('America/New_York');
    const [summary, setSummary] = useState('');
    const timezones = [
        { value: 'America/New_York', text: "America/New_York" },
        { value: 'America/Chicago', text: "America/Chicago" },
        { value: 'America/Denver', text: "America/Denver" },
        { value: 'America/Los_Angeles', text: "America/Los_Angeles" }
        ]


    const handleTimeZone = e => { 
        setTimeZone(e.target.value);
    }

    function handleUserCreatModalClose() {
        console.log("reached")
        setShowUserCreate(false)
    }
    
    function handleUserCrateModalOpen() {
        setShowUserCreate(true)
    }




    function handleTeamCreateModalOpen() {
        console.log("reached")
        setShowTeamCreate(true)
    }
    function handleTeamCreateModalClose() {
        setShowTeamCreate(false)
    }
    



    function handleWorkPermissionsModalOpen() {
        setShowWorkPermission(true)
    }
    function handleWorkPermissionsModalClose() {
        setShowWorkPermission(false)
    }
    

    const handleUserCreateSubmit = (e) => {
        e.preventDefault();
        console.log( {name: name, email:email, password: password, usertype: "user"})
        Axios.post('http://127.0.0.1:5000/register', {name: name, email:email, password: password, usertype: "user"})
        .then((response) => {
          console.log(response)
          alert("User created, please login.")
        })
        .catch((error) => {
            if (error.response.status === 400) {
                alert("Please enter all fields correctly")
            }
          })
        e.target.reset();
    }

    const handleTeamCreateSubmit = (e) => {
        e.preventDefault();
        console.log( {name: teamName, timezone:timezone, summary: summary})
        Axios.post('http://127.0.0.1:5000/create_team', {name: teamName, timezone:timezone, summary: summary})
        .then((response) => {
          console.log(response)
          alert("Team created")
        })
        .catch((error) => {
            if (error.response.status === 400) {
                alert("Please enter all fields correctly")
            }
          })
        e.target.reset();
    }
    function createUserForm(){
        return(
            <Form>
            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={(e) => setName(e.target.value)}  placeholder="Enter user name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
                </Form.Group>
            <Button onClick = {handleUserCreateSubmit} variant="primary" >
            Submit
            </Button>
            </Form>
        )
    }

    function createTeamsForm(){
        return(
            <Form>
                <Form.Group className="mb-3" controlId="formTeam">
                <Form.Label>Team name</Form.Label>
                <Form.Control onChange={(e) => setTeamName(e.target.value)}  placeholder="Enter user name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTeam">
                <Form.Label>Summary</Form.Label>
                <Form.Control onChange={(e) => setSummary(e.target.value)}  placeholder="Enter user name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTeam">
                <Form.Label>Time Zone </Form.Label>
                <select style = {{margin: "5px"}} value={timezone} onChange={handleTimeZone}>
              {timezones.map(item => {
                  return (<option key={item.value} 
                  value={item.value}>{item.text}</option>);
              })}
            </select>
            </Form.Group>
            <Button onClick = {handleTeamCreateSubmit} variant="primary" type="submit">
            Submit
            </Button>
            </Form>
        )
    }

    return (
    <div class = "cardDiv">
    <CardComponent handleModalOpen = {handleUserCrateModalOpen} title = "Create user" subtitle= "Add users in your team" links={[{name: "Create user",link:"link"}]}></CardComponent>
    <CardComponent handleModalOpen = {handleTeamCreateModalOpen} title = "Create team" subtitle= "Add teams in your project"  links={[{name: "Create team",link:"link"}]}></CardComponent>
    {/* <CardComponent  handleModalOpen = {handleWorkPermissionsModalOpen} title = "Work permissions" subtitle= "Add work permissions for your users" links={[{name: "Work Permission",link:"link"}]}></CardComponent> */}
    <Modal show={showUserCreate} onHide={handleUserCreatModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Users</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"50vh", overflowY:"scroll"}}>
            {createUserForm()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleUserCreatModalClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showTeamCreate} onHide={handleTeamCreateModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"50vh", overflowY:"scroll"}}>
            {createTeamsForm()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleTeamCreateModalClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
    
      );

}

export default Config;