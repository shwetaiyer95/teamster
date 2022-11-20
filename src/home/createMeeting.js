import './meetings.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker'
import moment from 'moment';
import './createMeeting.css';

export const CreateMeeting = () => {
    const [meetingData, setData] = useState({
        title: "",
        description: "",
        location: "",
        recurrence: 0,
        startDate: new Date(),
        endDate: new Date(),
        startHour: 0,
        startMinute: 0,
        endHour: 0,
        endMinute: 0
    })

    const [counter, setCounter] = useState(0)

    const handleSetTitle = (newTitle) => {
        var copyMeetingData = meetingData
        copyMeetingData.title = newTitle
        setData(copyMeetingData)
    }

    const handleSetDesc = (newDesc) => {
        var copyMeetingData = meetingData
        copyMeetingData.description = newDesc
        setData(copyMeetingData)
    }

    const handleSetLoc = (newLoc) => {
        var copyMeetingData = meetingData
        copyMeetingData.location = newLoc
        setData(copyMeetingData)
    }

    const handleStartDateChange = (newStartDate) => {
        var copyMeetingData = meetingData
        copyMeetingData.startDate = newStartDate
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    const handleEndDateChange = (newEndDate) => {
        var copyMeetingData = meetingData
        copyMeetingData.endDate = newEndDate
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    const handleStartHourChange = (newHour) => {
        var copyMeetingData = meetingData
        copyMeetingData.startHour = newHour
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    const handleStartMinuteChange = (newMinute) => {
        var copyMeetingData = meetingData
        copyMeetingData.startMinute = newMinute
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    const handleEndHourChange = (newHour) => {
        var copyMeetingData = meetingData
        copyMeetingData.endHour = newHour
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    const handleEndMinuteChange = (newMinute) => {
        var copyMeetingData = meetingData
        copyMeetingData.endMinute = newMinute
        setData(copyMeetingData)
        setCounter(counter+1)
    }

    // const handleSetRec = (newRec) => {
    //     var copyMeetingData = meetingData
    //     copyMeetingData.recurrence = newRec
    //     setData(copyMeetingData)
    // }

    const dropdownHeight = {
        control: base => ({
            ...base,
            height: 10,
            minHeight: 10,
            maxHeight: 15
          })
    }

    const handleCreateMeetingSubmit = () => {
        const toSend = {
            'summary': meetingData.title,
            'location': meetingData.location,
            'description': meetingData.description,
            'start': {
                'dateTime': convertDate(meetingData.startDate, meetingData.startHour, meetingData.startMinute),
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': convertDate(meetingData.endDate, meetingData.endHour, meetingData.endMinute),
                'timeZone': 'America/Los_Angeles',
            },
        }
        console.log(toSend)
    }

    const convertDate = (date, hour, minute) => {
        // '2022-11-19T09:00:00-07:00'
        const newDate = date.toLocaleDateString("en-US")
        const newHour = hour%10 === 0 ? `0${hour.toString()}`: hour.toString()
        const newMinute = minute%10 === 0 ? `0${minute.toString()}`: minute.toString()
        const momentDate = moment(`${newDate}T${newHour}:${newMinute}`, 'MM/DD/YYYYTHH:mm').format('YYYY-MM-DDTHH:mm:ss');
        return momentDate + `.0+000000`
    }

    const getHours = (prefix) => {
        const hoursList = []
        for (let i = 0; i < 24; i++) {
            hoursList.push(<option key={prefix+i} value={i}>{i.toString()}</option>)
        } 
        return hoursList
    }

    const getMinutes = (prefix) => {
        const minutesList = []
        for (let i = 0; i < 59; i++) {
            minutesList.push(<option key={prefix+i} value={i}>{i.toString()}</option>)
        } 
        return minutesList
    }

    return (
        <div className="wrapperDiv">
            <div className="titlebar">
                <p className="titlebarname">
                Welcome!,
                </p>
            </div>
            <div>
                <Form>
                    <div className="flexMeetingContainer">
                    <div
                    className="detailsbox"
                    style={{ height: 'fit-content' }}
                    >
                        <p className="font-epilogue font-bold mb-8 xl:mb-16 xl:w-400">
                            1. Enter details:
                        </p>
                        <div>
                            <Form.Group className="mb-3" controlId="formMeetingTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" onBlur={(event) => handleSetTitle(event.target.value)}/>
                                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMeetingDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" onBlur={(event) => handleSetDesc(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLocation">
                                <Form.Label>Location/Link</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location/Link" onBlur={(event) => handleSetLoc(event.target.value)}/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="detailsbox">

                    {/* <Form.Group className="mb-3" controlId="formAttendees" onBlur={(event) => handleSetRec(event.target.value)}>
                        <Form.Label>Recurrence</Form.Label>
                        <div key="inline-radio">
                            <Form.Check inline type="radio" name="group1" label="None" value={0}/>
                            <Form.Check inline type="radio" name="group1" label="Hourly" value={1}/>
                            <Form.Check inline type="radio" name="group1" label="Daily" value={2}/>
                            <Form.Check inline type="radio" name="group1" label="Weekly" value={3}/>
                            <Form.Check inline type="radio" name="group1" label="Monthly" value={4}/>
                        </div>
                    </Form.Group> */}

                            <Form.Group className="mb-3" controlId="formStartDate">
                                <Form.Label>Start Date:</Form.Label>
                                <div>
                                    <DatePicker value={meetingData.startDate} onChange={handleStartDateChange} />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEndDate">
                                <Form.Label>End Date: </Form.Label>
                                <div>
                                    <DatePicker value={meetingData.endDate} onChange={handleEndDateChange} />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formStartTime">
                                <Form.Label>Start Time: </Form.Label>
                                <select value={meetingData.startHour} onChange={(event) => handleStartHourChange(event.target.value)}>
                                    {getHours("s")}
                                </select>
                                <select value={meetingData.startMinute} onChange={(event) => handleStartMinuteChange(event.target.value)}>
                                    {getMinutes("s")}
                                </select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEndTime">
                                <Form.Label>End Time: </Form.Label>
                                <select value={meetingData.endHour} onChange={(event) => handleEndHourChange(event.target.value)}>
                                    {getHours("e")}
                                </select>
                                <select value={meetingData.endMinute} onChange={(event) => handleEndMinuteChange(event.target.value)} style={dropdownHeight}>
                                    {getMinutes("e")}
                                </select>
                            </Form.Group>
                        
                        
                    </div>
                    </div>
                    <div className="submitButtonWrapper">
                    <Button variant="primary" type="submit" onClick = {handleCreateMeetingSubmit}>
                        Submit
                    </Button>
                    </div>
                
                
                </Form>
                </div>
                </div>
    )
}