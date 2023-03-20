const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const saltRounds = 10;
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', saveUninitialized: true, resave: true }));

// import the controllers
const register = require('./Controllers/register');
const login = require('./Controllers/login');
const home = require('./Controllers/home');
// const instructor =  require('./Controllers/instructor');
// const course = require('./Controllers/course');
// const courseRunning  = require('./Controllers/courseRunning');
// const instructor = require('./Controllers/instructor');

// register user
app.post('/register', register.register);

// authenticate user
app.post('/login', login.login);
// app.post('/home', home.router);
app.post('/home/getUserData', home.getUserData);
// app.post('/home/getCourses', home.getCourses);
// app.post('/instructor/:instructor_id', instructor.instructor);
// app.post('/course/:course_id', course.getCourses);
// app.post('/course/running', courseRunning.getDeptsRunningCourses);
// app.post('/course/running/:dept_name', courseRunning.getDeptCourses);


// app.post('/courses', courses.courses);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// const http = require('http');
// const path = require('path')
// const fs = require('fs')

// const server = http.createServer((req,res) => {
//     if(req.url === '/') {
//         res.end('<h1>WsdadsaWaaa</h1>')
//     }
// })

// const PORT = 5000;

// server.listen(PORT, () => console.log(`server running on port ${PORT}`))