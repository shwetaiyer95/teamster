import CardComponent from "./cardComponent"
import './cardComponent.css'
import Button from 'react-bootstrap/Button';
import './meetings.css'
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Axios from "axios"
import moment from 'moment';

export const Meetings = () => {

    const [caldata, setcaldata] = useState([])

    const convertDateToDisplay = (date) => {
        const tempdate = date.substring(0, date.length-5)
        return moment(tempdate, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY HH:mm');
    }

    const getEventCard = (id, summary, duration, description, htmlLink) => {
        return <CardComponent key={id} title={summary} subtitle={duration} text={description} links={htmlLink}></CardComponent>
    }

    const navigate = useNavigate();
    const routeChange = (path) =>{
        navigate(path)
    }

    useEffect(() => {
        const HOST = "http://127.0.0.1:5000";
        Axios.get(`${HOST}/get_events`)
        .then((response) => {
            setcaldata(response.data.events);
        })
        .catch((error) => {
            const data = error.response.data
            if (error.response.status === 400) {
                console.log("something went wrong")
            }
        })
    },[])

    return (
        <div className="meetingWrapper">
            <div className="titlebar">
                <p className="titlebarname">
                Here are your meetings!
                </p>
                <Button variant="primary" onClick={() => routeChange("/createMeeting")}>Create Meeting</Button>
            </div>

            <div className="cardsWrapperMeetings">
                {
                caldata && caldata.map(event => {
                    // console.log(event.summary)
                    // console.log(event.description)
                    return getEventCard(event.id, event.summary, 
                        `${convertDateToDisplay(event.start.dateTime)} - ${convertDateToDisplay(event.end.dateTime)}`,
                        event.description, event.htmlLink)
                })}
            </div>
        </div>
    )
}