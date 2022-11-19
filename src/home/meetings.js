import CardComponent from "./cardComponent"
import './cardComponent.css'

export const Meetings = (id, summary, description, link) => {
    const caldata = [{'kind': 'calendar#event', 
    'etag': '"3337796069736000"', 
    'id': 'g0e7hltjtthhrrsah9djahpp2k_20221119T160000Z', 
    'status': 'confirmed', 
    'htmlLink': 'https://www.google.com/calendar/event?eid=ZzBlN2hsdGp0dGhocnJzYWg5ZGphaHBwMmtfMjAyMjExMTlUMTYwMDAwWiBuaWtzczAwOEBt', 
    'created': '2022-11-19T22:47:14.000Z', 
    'updated': '2022-11-19T22:47:14.868Z', 
    'summary': 'test event', 
    'description': "A chance to hear more about Google's developer products.", 'location': '800 Howard St., San Francisco, CA 94103', 'creator': {'email': 'nikss008@gmail.com', 'self': 'True'}, 'organizer': {'email': 'nikss008@gmail.com', 'self': 'True'}, 'start': {'dateTime': '2022-11-19T21:30:00+05:30', 'timeZone': 'America/Los_Angeles'}, 'end': {'dateTime': '2022-11-20T05:30:00+05:30', 'timeZone': 'America/Los_Angeles'}, 'recurringEventId': 'g0e7hltjtthhrrsah9djahpp2k', 'originalStartTime': {'dateTime': '2022-11-19T21:30:00+05:30', 'timeZone': 'America/Los_Angeles'}, 'iCalUID': 'g0e7hltjtthhrrsah9djahpp2k@google.com', 'sequence': 0, 'attendees': [{'email': 'nc3283@rit.edu', 'responseStatus': 'needsAction'}], 'reminders': {'useDefault': false, 'overrides': [{'method': 'email', 'minutes': 1440}, {'method': 'popup', 'minutes': 10}]}, 'eventType': 'default'}]

    const getEventCard = (id, summary, duration, description, htmlLink) => {
        return <CardComponent key={id} title={summary} subtitle={duration} text={description} links={htmlLink}></CardComponent>
    }

    return (
        <div className="cardDiv">
            {caldata.map(event => {
                console.log(event.summary)
                console.log(event.description)
                return getEventCard(event.id, event.summary, `${event.start.dateTime} - ${event.end.dateTime}`,event.description, event.htmlLink)
            })}
        </div>
    )
}