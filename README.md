# Teamster

Teamster is the best way to track the workflow and manage the time of focus, break, habit, and meetings on top of the project management service and increasing the productivity of projects and maintaining the work-life balance of the working employee.

## Inspiration
According to a recent [study](https://www.zippia.com/advice/wasting-time-at-work-statistics/), 89% of workers say they waste at least 30 minutes of their time at work everyday. One of the contributing factors for decreased productivity, is improper time management. Sometimes while we ought to do something, resolve a problem or accomplish an objective, it could be very overwhelming, and we tend to procrastinate from time to time. However, when you split the time spent on your problem or goal into small segments, you will realize that it is easier than you think. This is where the Pomodoro technique is useful.

## What it does

Teamster solves problems by allowing tasks associated with project management service and makes tracking time easier as the users are provided with timers in the Pomodoro technique. It also keeps the track of different user activities such as focus, break, habit, meetings and also manages board of messages from workforce in a fun and unique way.

## How we built

**ReactJS** was used the frontend framework to create the application with a **REST API** setup using **Flask** as the server. We employ API calls to perform standard CRUD operations for user and team management. We use **MySQL** server as the database for our applications which is hosted using **AWS RDS** accessed using `PyMySQL` for connection.

## Accomplishments that we're proud of:

* Using teamster we can keep track of time you spend on your tasks.
* It helps you focus deeply in a short time on an important task.
* It makes you more efficient since you start timing your tasks and also helps in managing daily habits.
* It helps the team assign and manage tasks and provides efficient communication and feedback.
* We learned new Technologies such as Pomodoro, Flask etc.
* Once hosted, this app is online and can be accessed with any device(iPad, iPhone, Android, Web browser) which makes it user-friendly.

## Challenges we ran into

While it was not easy to put this together, here are few of the challenges we faced:

* **Time management UI**: The project required many different types of components for the frontend to represent all the aspects of time and project management, and making them work was challenging.
* **Integrating API**: The app required many different endpoints and thus needed to be integrated with each corresponding UI component.
* **Generating Pomodoro time slots**: The app also needed to auto-generate time slots for focus and breaks for each user, considering the conflicts created by their habits and other scheduled meetings.

## Python instructions

* `pip3 install -r requirements.txt`

Installs all python packages used in project

* `python3 app.py`

Runs all flask Apis locally.

## Node instructions

* `npm install`

Installs all the dependencies on the local machine.\

* `npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
