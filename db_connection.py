from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from flask import Flask, request, jsonify
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
            sql = "INSERT INTO team(teamID, teamName, calendar, timezone) values(UUID(),'%s','%s','%s');" % (name, calendar_id, time_zone)
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

# def create_team(name):
#     try:
#         conn = connect()
#         with conn.cursor() as cur:
#             sql = "INSERT INTO team(teamID, teamName) values(UUID(),'%s');" % (name)
#             cur.execute(sql)
#             conn.commit()
#             return True
#     except Exception:
#         return False


def create_user_details(uid, pom_start, pom_end):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO team(userid, start_time, end_time) values('%s', '%s', '%s');" % (uid, pom_start, pom_end)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


def create_habits(name, start_time, end_time, recur_type):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO habits(habitid, name, start_time, end_time, recurring) values(UUID(), '%s', '%s', '%s', '%s');" % (
                name, start_time, end_time, recur_type)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


def create_meeting(name, start_time, end_time, recur_type):
    try:
        conn = connect()
        with conn.curosr() as cur:
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
        with conn.curosr() as cur:
            sql = "INSERT INTO task(taskID, name, duration, description, assigned) values(UUID(), '%s', '%s', '%s', '%s');" % (
                name, duration, description, assigned)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False

# @app.route('/create_team', methods=['POST'])
# def team_creator():
#     name = request.json.get('name')
#     if name is not None:
#         if create_team(name):
#             return make_response(jsonify({'message': 'Team created'}), 200)

@app.route('/create_user_details', methods=['POST'])
def user_detail_creator():
    uid = request.json.get('uid')
    pom_start = request.json.get('pom_start')
    pom_end = request.json.get('pom_end')
    if uid is not None and pom_start is not None and pom_end is not None:
        if create_user_details(uid, pom_start, pom_end):
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
        if create_habits(name, assigned, duration, description):
            return make_response(jsonify({'message': 'Habit created'}, 200))

    return make_response(jsonify({}), 400)


@app.route('/register', methods=['POST'])
def register():
    print("reached")
    email = request.json.get('email')
    name = request.json.get('name')
    passwd = request.json.get('password')
    usertype = request.json.get('usertype')
    if email is not None and name is not None and passwd is not None and usertype is not None:
        if create_user(name, email, passwd, usertype):
            return make_response(jsonify({'message': 'User created'}), 200)

    return make_response(jsonify({}), 400)


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
