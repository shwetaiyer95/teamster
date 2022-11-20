import React, {useState} from "react";
import CardComponent from "./cardComponent"
import './cardComponent.css'
import { Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
export const PlannerHome = () => {
    const { userId } = useParams();
    const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false)
    const [focusTime, setFocusTime] = useState(0)
    const [breakTime, setBreakTime] = useState(0)

    const handleUpdatePomodoroModalOpen = () => {
        setIsPomodoroModalOpen(true)
    }

    const handleUpdatePomodoroModalClose = () => {
        setIsPomodoroModalOpen(false)
    }

    const handlePomodoroSubmit = (e) => {
        
    }

    function createPomodoroForm(){
        return(
            <Form>
                <Form.Group className="mb-3" controlId="formFocus">
                    <Form.Label>Focus Time</Form.Label>
                    <Form.Control type="number" onChange={(e) => setFocusTime(e.target.value)}  placeholder="Enter Focus Time. Must be less than 60" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBreak">
                    <Form.Label>Break Time</Form.Label>
                    <Form.Control type="number" onChange={(e) => setBreakTime(e.target.value)} placeholder="Enter Break Time. Must be less than 60" />
                </Form.Group>

                <Button onClick = {handlePomodoroSubmit} variant="primary" >
                Submit
                </Button>
            </Form>
        )
    }

    return (
        <div>
            <CardComponent handleModalOpen = {handleUpdatePomodoroModalOpen} title="Pomodoro Timer" subtitle="Your Pomodoro Time" text="Focus Time: Relax Time:" link="Change time"></CardComponent>
            <Modal show={isPomodoroModalOpen} onHide={handleUpdatePomodoroModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Pomodoro time</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight:"50vh", overflowY:"scroll"}}>
                    {createPomodoroForm()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdatePomodoroModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}