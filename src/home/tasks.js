import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardComponent from "./cardComponent"
import Table from 'react-bootstrap/Table';
import { Button, Form, FormCheck, Modal } from 'react-bootstrap';
import Axios from "axios"
import { useParams } from 'react-router-dom';

export default function Tasks() {
  const [showTaskCreate, setShowTaskCreate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [assigned, setAssigned] = useState("");
  const back = [{"id": 1, "title": "first task", "summary": "first subtitle", "duration": "2022-12-24 12:02:13"}]
  const completed = [{"id": 1, "title": "create react app", "summary": "create your first app", "duration": "2022-15-24 12:02:13"}]
  const HOST = "http://127.0.0.1:5000";
  const { userId } = useParams();
  useEffect(() => {
    fetchTasks();
    console.log("fetched tasks")
  }, []);

 function handleTaskCreateModalClose (){
    setShowTaskCreate(false)
 }

 function handleTaskCreateModalOpen(){
    setShowTaskCreate(true)
 }
  const getTaskCard = (id, title, summary,duration) => {
    console.log(duration)
    return <CardComponent key={id} title={title} text={duration} subtitle={summary}></CardComponent>
}
const fetchTasks = async () => {
    getTasks(userId);
};
const getTasks = (uid) => {

Axios.get(`${HOST}/get_tasks/${uid}`)
.then((response) => {
    console.log(response.data)
    setTasks(response.data.tasks);
})
.catch((error) => {
    const data = error.response.data
    if (error.response.status === 400) {
        console.log("comething went wrong")
    }
    })
};

  const handleTaskCreateSubmit = (e) => {
    e.preventDefault();
    console.log({name: title, assigned:assigned, duration: "", description: summary})
    Axios.post('http://127.0.0.1:5000/create_task', {name: title, assigned:assigned, duration: "", description: summary})
    .then((response) => {
      alert("Task Created")
    })
    .catch((error) => {
        if (error.response.status === 400) {
            alert("Please enter all fields correctly")
        }
      })
    e.target.reset();
}

  function createTasksForm(){
    return(
        <Form>
            <Form.Group className="mb-3" controlId="formTasks">
            <Form.Label>Task title</Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)}  placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSummary">
            <Form.Label>Task summary</Form.Label>
            <Form.Control onChange={(e) => setSummary(e.target.value)}  placeholder="Enter Summary" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAssigned">
            <Form.Label>Assigned</Form.Label>
            <Form.Control onChange={(e) => setAssigned(e.target.value)}  placeholder="Enter Assigned" />
            </Form.Group>

        <Button onClick = {handleTaskCreateSubmit} variant="primary" type="submit">
        Submit
        </Button>
        </Form>
    )
}

  return (
    <div >
    <div style = {{marginBottom: "10px"}}>
    <Button  onClick = {handleTaskCreateModalOpen} variant="primary" >
            Add task
    </Button>
    </div>
    <Table  bordered hover>
      <thead>
        <tr>
          <th>Backlog</th>
          <th>Current</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div>
        {back.map(event => {
                    return getTaskCard(event.id,event.title,event.summary,event.duration)
                })}
   </div></td>
          <td><div>
        {tasks.map(event => {
                    return getTaskCard(event.id,event.title,event.summary,event.duration)
                })}
   </div></td>
          <td><div>
        {completed.map(event => {
                    return getTaskCard(event.id,event.title,event.summary,event.subtitle)
                })}
   </div></td>
        </tr>
      </tbody>

      <Modal show={showTaskCreate} onHide={handleTaskCreateModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"50vh", overflowY:"scroll"}}>
            {createTasksForm()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleTaskCreateModalClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </Table>
    </div>
  );
}
