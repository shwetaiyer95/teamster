import React, {useEffect, useState} from "react";
import CardComponent from "./cardComponent"
import './cardComponent.css'
import { Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from "axios"
// import PomTimer from "./timer";
import { useTimer } from 'react-timer-hook';
import './plannerhome.css'

export const PlannerHome = () => {
    const { userId } = useParams();
    const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false)
    const [focusTime, setFocusTime] = useState(2)
    const [breakTime, setBreakTime] = useState(1)
    const[currentTime, setCurrentTime] = useState("Focus Time")
    const [time, setTime] = useState(new Date())
    const cardText = `Focus Time and Relax Time are  ${focusTime} and ${breakTime} minutes respectively`
    
    useEffect(() => {
        const newTime = time
        newTime.setSeconds(time.getSeconds() + 10)
        setTime(newTime); // 10 minutes timer
    },[])

    const handleUpdatePomodoroModalOpen = () => {
        setIsPomodoroModalOpen(true)
    }

    const handleUpdatePomodoroModalClose = () => {
        setIsPomodoroModalOpen(false)
    }

    const handlePomodoroSubmit = (e) => {
    }

    useEffect(() => {
        const HOST = "http://127.0.0.1:5000";
        Axios.get(`${HOST}/get_focus_break_time/${userId}`)
        .then((response) => {
            setFocusTime(response.data)
        })
        .catch((error) => {
            const data = error.response.data
            if (error.response.status === 400) {
                console.log("something went wrong")
            }
        })
    }, [])

    function MyTimer({ expiryTimestamp }) {
        const {
          seconds,
          minutes,
          hours,
          days,
          isRunning,
        //   start,
        //   pause,
        //   resume,
        //   restart,
        } = useTimer({ expiryTimestamp, onExpire: () => handleExpire() });
      
        const handleExpire = () => {
            if(currentTime === 'Focus Time') {
                setCurrentTime('Break Time')
                const newTime = time
                newTime.setSeconds(time.getSeconds() + breakTime*60)
                setTime(newTime); 
            } else {
                setCurrentTime('Focus Time')
                const newTime = time
                newTime.setSeconds(time.getSeconds() + focusTime*60)
                setTime(newTime); 
            }
        }

        return (
          <div className="titlebar">
            <p className="titlebarname">
               Planner
            </p>
            <p className="titlebarname">
              <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              <span>{`  ${currentTime}`}</span>
            </p>
          </div>
        );
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
        <div className="meetingWrapper">
            <MyTimer expiryTimestamp={time} />
            <CardComponent handleModalOpen = {handleUpdatePomodoroModalOpen} title="Pomodoro Timer" subtitle="Your Pomodoro Time" text={cardText} link="Change time"></CardComponent>
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