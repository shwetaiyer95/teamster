import pymysql.cursors
from flask import Flask, request, jsonify
from flask import make_response

from dotenv import load_dotenv
import os

load_dotenv()

HOST = os.getenv("HOST")
PORT = os.getenv("DB_PORT")
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("USER_KEY")
DBNAME = os.getenv("DB_NAME")

app = Flask(__name__)


def connect():
    conn = pymysql.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, database=DBNAME)
    return conn


def create_user(name, email, passwd, usertype):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO user_table(userid, email, password, name, userType) values(UUID(), '%s','%s','%s', '%s');" % (
                email, passwd, name, usertype)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:

        return False


def create_team(name):
    try:
        conn = connect()
        with conn.cursor() as cur:
            sql = "INSERT INTO team(teamID, teamName) values(UUID(),'%s');" % (name)
            cur.execute(sql)
            conn.commit()
            return True
    except Exception:
        return False


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


@app.route('/create_team', methods=['POST'])
def team_creator():
    name = request.json.get('name')
    if name is not None:
        if create_team(name):
            return make_response(jsonify({'message': 'Team created'}), 200)


@app.route('/create_user_details', methods=['POST'])
def user_detail_creator():
    uid = request.json.get('uid')
    pom_start = request.json.get('pom_start')
    pom_end = request.json.get('pom_end')
    if uid is not None and pom_start is not None and pom_end is not None:
        if create_user_details(uid, pom_start, pom_end):
            return make_response(jsonify({'message': 'User details created'}, 200))

    return make_response(jsonify({}), 400)


@app.route('/create_habit', method=['POST'])
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
@app.route('/create_task', method=['POST'])
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
