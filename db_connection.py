from datetime import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from flask import Flask, request, jsonify
from pomodoro import get_time_slots_with_conflicts
from flask import make_response
from flask_cors import CORS
import pymysql

from dotenv import load_dotenv
import os

load_dotenv()
SCOPES = ['https://www.googleapis.com/auth/calendar']
HOST = os.getenv("DB_HOST")
PORT = int(os.getenv("DB_PORT"))
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("USER_KEY")
DBNAME = os.getenv("DB_NAME")

app = Flask(__name__)
CORS(app)


def connect():
    conn = pymysql.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, database=DBNAME)
    return conn


def authenticate(email, password):
    try:
        conn = connect()
        with conn.cursor() as cur:
            cur.execute(
                "SELECT userid,userType FROM user_table WHERE email = '%s' AND password = '%s';" % (email, password))
            res = cur.fetchone()
            return res[0], res[1]
    except Exception:
        return 0


@app.route('/login', methods=['POST'])
def login():
    if request.json and 'email' in request.json and request.json['email'] != '' and 'password' in request.json \
            and request.json['password'] != '':
        result = authenticate(request.json['email'], request.json['password'])
        userid, user_type = result[0], result[1]
        if userid and user_type:
            return make_response(jsonify({'message': 'Login successful', 'userid': userid, 'usertype': user_type}), 200)
    return make_response(jsonify({}), 400)


def create_credentials(credentials_file: str):
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_file, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds


def create_calendar(creds, summary, timezone):
    try:
        service = build('calendar', 'v3', credentials=creds)

        calendar = {
            'summary': summary,
            'timeZone': timezone
        }

        created_calendar = service.calendars().insert(body=calendar).execute()
        return created_calendar['id']
    except HttpError as error:
        print('An error occurred: %s' % error)


def create_team(name, summary, time_zone):
    try:
        conn = connect()
        with conn.cursor() as cur:
            creds = create_credentials("credentials.json")
            calendar_id = create_calendar(creds, summary, time_zone)
            sql = "INSERT INTO team(teamID, teamName, calendar, timezone) values(UUID(),'%s','%s','%s');" % (
                name, calendar_id, time_zone)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception as e:
        print(e)
        return False


@app.route('/create_team', methods=['POST'])
def team_creator():
    name = request.json.get('name')
    # timezone = 'America/Los_Angeles'
    timezone = request.json.get('timezone')
    # summary = 'calendarSummary'
    summary = request.json.get('summary')

    if name is not None:
        if create_team(name, summary, timezone):
            return make_response(jsonify({'message': 'Team created'}), 200)
    return make_response(jsonify({}), 400)


def create_user(name, email, passwd, usertype):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO user_table(userid, email, password, name, userType) values(UUID(), '%s','%s','%s', '%s');" % (
                email, passwd, name, usertype)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception as e:
        print(e)
        return False


def create_user_details(uid, focus_time, break_time, pom_start, pom_end):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO user_detail(userid, focus_time, break_time, start_time, end_time) values('%s', '%s', '%s');" % (
                uid, focus_time, break_time, pom_start, pom_end)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


def create_habits(name, start_time, end_time, recur_type):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO habits(habitId, habitName, start_time, end_time, recurring) values(UUID(), '%s', '%s', '%s', '%s');" % (
                name, start_time, end_time, recur_type)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


def create_meeting(name, start_time, end_time, recur_type):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO meeting_details(meetingID, name, start_time, end_time, recurring) values(UUID(), '%s', '%s', '%s', '%s');" % (
                name, start_time, end_time, recur_type)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


def create_task(name, assigned, duration, description):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "SELECT userid FROM user_table WHERE name='%s';" % (assigned)
            cur.execute(sql)
            userid = cur.fetchone()[0]
            sql = "INSERT INTO task(taskId, name, duration, description, assignedId) values(UUID(), '%s', '%s', '%s', '%s');" % (
                name, duration, description, userid)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False

def get_task(uid):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "SELECT taskID, name, duration, description FROM task WHERE assignedId='%s';" % (uid)
            cur.execute(sql)
            tasks = cur.fetchall()
        return tasks
    except Exception:
        return False

def generate_pomodoro_time_slots(uid):
    try:
        conn = connect()
        conflicts = []
        with conn.cursor() as cur:
            sql = "SELECT start_time, end_time FROM user_detail WHERE userid='%s';" % (uid)
            cur.execute(sql)
            start, end = cur.fetchall()[0]
            sql = "SELECT meetingID FROM meeting_user WHERE user_id='%s';" % (uid)
            cur.execute(sql)
            meeting_ids = cur.fetchall()
            for meeting in meeting_ids:
                sql = "SELECT start_time, end_time FROM meeting_details WHERE meetingID='%s';" % (meeting)
                start_time, end_time = cur.fetchall()[0]
                conflicts.append([start_time, end_time])

            sql = "SELECT habitId FROM user_habit WHERE user_id='%s';" % (uid)
            cur.execute(sql)
            habit_ids = cur.fetchall()
            for habit_id in habit_ids:
                sql = "SELECT start_time, end_time FROM habits WHERE habitId='%s';" % (habit_id)
                start_time, end_time = cur.fetchall()[0]
                conflicts.append([start_time, end_time])
        return get_time_slots_with_conflicts(start, end, conflicts)
    except Exception:
        return False

def get_focus_break_time(uid):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "SELECT focus_time, break_time FROM user_detail WHERE userid='%s';" % (uid)
            cur.execute(sql)
            focus_time, break_time  = cur.fetchall()[0]
        return focus_time, break_time
    except Exception:
        return False

# Left to do
@app.route('/get_pomodoro_time_slots', methods=['POST'])
def get_pomodoro_time_slots():
    userid = request.json.get('userid')

    if userid is not None:
        time_slots = generate_pomodoro_time_slots(uid=userid)
        return make_response(jsonify({'slots': time_slots}), 200)


def get_events(creds):
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
        return make_response(jsonify([]), 400)

    return events


@app.route('/get_events')
def note_getter():
    events = get_events(create_credentials("credentials.json"))
    if events:
        return make_response(jsonify({'events': events}), 200)
    return make_response(jsonify({}), 400)


@app.route('/create_user_details', methods=['POST'])
def user_detail_creator():
    uid = request.json.get('uid')
    pom_start = request.json.get('pom_start')
    pom_end = request.json.get('pom_end')
    focus_time = request.json.get('focus_time')
    break_time = request.json.get('break_time')
    if uid is not None and pom_start is not None and pom_end is not None and focus_time is not None and break_time is not None:
        if create_user_details(uid, focus_time, break_time, pom_start, pom_end):
            return make_response(jsonify({'message': 'User details created'}, 200))

    return make_response(jsonify({}), 400)


@app.route('/create_habit', methods=['POST'])
def habit_creator():
    name = request.json.get('name')
    start_time = request.json.get('start_time')
    end_time = request.json.get('end_time')
    recur_type = request.json.get('recur_type')
    if name is not None and start_time is not None and end_time is not None and recur_type is not None:
        if create_habits(name, start_time, end_time, recur_type):
            return make_response(jsonify({'message': 'Habit created'}, 200))

    return make_response(jsonify({}), 400)


# create_task(name, assigned, duration, description)
@app.route('/create_task', methods=['POST'])
def task_creator():
    name = request.json.get('name')
    assigned = request.json.get('assigned')
    duration = request.json.get('duration')
    description = request.json.get('description')
    if name is not None and assigned is not None and duration is not None and description is not None:
        if create_task(name, assigned, duration, description):
            return make_response(jsonify({'message': 'Habit created'}, 200))

    return make_response(jsonify({}), 400)


@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    name = request.json.get('name')
    passwd = request.json.get('password')
    usertype = request.json.get('usertype')
    if email is not None and name is not None and passwd is not None and usertype is not None:
        if create_user(name, email, passwd, usertype):
            return make_response(jsonify({'message': 'User created'}), 200)

    return make_response(jsonify({}), 400)

@app.route('/get_tasks/<string:uid>')
def method_task(uid):
    if uid and uid!= '':
        tasks = get_task(uid)
        if tasks:
            return make_response(jsonify({'tasks': tasks}), 200)
        else:
            return make_response(jsonify({'tasks': []}), 200)

    return make_response(jsonify({}), 400)


@app.route('/get_focus_break_time/<string:uid>')
def get_method_focus_break_time(uid):
    if uid and uid!= '':
        focus_time, break_time = get_focus_break_time(uid)
        if focus_time:
            return make_response(jsonify({'focus_time': focus_time, 'break_time': break_time}), 200)
        else:
            return make_response(jsonify({'focus_time': [], 'break_time': break_time}), 200)

    return make_response(jsonify({}), 400)


def create_event(creds, summary, location, description, start, end):
    service = build('calendar', 'v3', credentials=creds)
    event = {
        'summary': summary,
        'location': location,
        'description': description,
        'start': {
            'dateTime': start,
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': end,
            'timeZone': 'America/Los_Angeles',
        },
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }
    event = service.events().insert(calendarId='primary', body=event).execute()
    return event.get('htmlLink')


@app.route('/create_event', methods=['POST'])
def event_creator():
    req = request.json
    # summary = "test event"
    summary = req["summary"]
    # location ="800 Howard St., San Francisco, CA 94103"
    location = req["location"]
    # description = 'A chance to hear more about Google\'s developer products.'
    description = req["description"]
    # start = '2022-11-19T09:00:00-07:00'
    start = req["start"]
    # end = '2022-11-19T17:00:00-07:00'
    end = req["end"]

    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    event_link = create_event(creds, summary, location, description, start, end)
    return make_response(jsonify({'event': event_link}), 200)


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
