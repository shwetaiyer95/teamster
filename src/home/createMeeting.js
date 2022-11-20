import './meetings.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-date-picker'

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

    const handleCreateMeetingSubmit = () => {
        
    }

    const getHours = () => {
        const hoursList = []
        for (let i = 0; i < 24; i++) {
            hoursList.push(<option value={i}>{i.toString()}</option>)
        } 
        return hoursList
    }

    const getMinutes = () => {
        const minutesList = []
        for (let i = 0; i < 59; i++) {
            minutesList.push(<option value={i}>{i.toString()}</option>)
        } 
        return minutesList
    }

    return (
        <div>
            <div className="titlebar">
                <p className="titlebarname">
                Welcome!,
                </p>
            </div>
            <div className="flex">
                <Form>
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
                                    <DatePicker value={meetingData.startDate} onChange={(event) => handleStartDateChange(event.target.value)} />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEndDate">
                                <Form.Label>End Date: </Form.Label>
                                <div>
                                    <DatePicker value={meetingData.endDate} onChange={(event) => handleEndDateChange(event.target.value)} />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formStartTime">
                                <Form.Label>Start Time: </Form.Label>
                                <select value={meetingData.startHour} onChange={(event) => handleStartHourChange(event.target.value)}>
                                    {getHours()}
                                </select>
                                <select value={meetingData.startMinute} onChange={(event) => handleStartMinuteChange(event.target.value)}>
                                    {getMinutes()}
                                </select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEndTime">
                                <Form.Label>End Time: </Form.Label>
                                <select value={meetingData.endHour} onChange={(event) => handleEndHourChange(event.target.value)}>
                                    {getHours()}
                                </select>
                                <select value={meetingData.endMinute} onChange={(event) => handleEndMinuteChange(event.target.value)}>
                                    {getMinutes()}
                                </select>
                            </Form.Group>
                        
                        
                    </div>
                    
                    <Button variant="primary" type="submit" onclick = {handleCreateMeetingSubmit}>
                        Submit
                    </Button>
                    
                
                
                </Form>
                </div>
                </div>
    )
}