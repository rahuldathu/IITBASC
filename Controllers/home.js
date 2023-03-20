// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
const pg = require('pg');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// const {getClient} = require('./get-client')
const http = require('http');

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'rahul1',
  password: 'rahul1',
  database: 'rahul'    
});

// client.connect(); 
// async () => {
// const client = await getClient();}

// Function to retrieve the logged in user data
const getUserData = async (req, res) => {
  
  // const id = req.query.id;
  const id = '12345';
  const values = [id]
  const query = `
    SELECT *
    FROM student
    WHERE id = $1
  `;

  try{
    // const client = await getClient();
    await client.connect();
    const data = await client.query(query,values);
    console.log(data.rows[0]);
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(result.rows[0]));
    res.writeHead(200,'Content-Type', 'application/json')
    res.write(JSON.stringify(data));
    // console.log(data)
    // res.end();
  }
  catch(error){
    console.error(error);
    res.status(500).send({ error: "An error occurred on the server." });
  }

  // client.query(query, [id], (err)) => {
  //   if (err) {
  //     return console.error('Error executing query', err.stack);
  //   }
  //   // console.log(result.rows);
  //   // res.send(result.rows[0]);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify(result.rows[0]));
  // });
  //   console.error(error);
  //   res.status(500).json({ error: "An error occurred on the server." });

};

// Function to retrieve the courses registered by the logged in user in previous semesters
const getCourses = async (req, res) => {
  // const client = await getClient();
  // const id = req.query.id;
  const id = '54321';
  // query works checked
  await client.connect();
  const query2 = `
    SELECT t.sec_id, t.semester, t.year, c.course_id, title, credits
    FROM takes t
    JOIN section s ON t.course_id = s.course_id AND t.sec_id = s.sec_id AND t.semester = s.semester AND t.year = s.year
    JOIN course c ON s.course_id = c.course_id
    WHERE id = $1 AND (t.semester, t.year) < (SELECT semester, year FROM reg_dates ORDER BY year DESC, semester DESC LIMIT 1)
    ORDER BY  year DESC, semester DESC, title DESC
  `;

  try{
    const result = await client.query(query2, [id])
    res.writeHead(200,'Content-Type', 'application/json')
    res.write(JSON.stringify(result));
    console.log(JSON.stringify(result.rows))
    console.log('')
    console.log(JSON.stringify(groupBySemester(result.rows)))
    // res.send(JSON.stringify(result.rows))
  }
  catch(err){
    console.error(err);
    // res.status(500).send({ error: "An error occurred on the server." });
  }
  
  
  // client.query(query2, [id], (err, result) => {
  //   if (err) {
  //     return console.error('Error executing query', err.stack);
  //   }
  //   console.log('hello world')
  //   // res.send(groupBySemester(result.rows));
  //   // const groupedCourses = groupBySemester(result.rows);
  //   // console.log(result.rows)
  //   res.setHeader('Content-Type', 'application/json');
  //   // res.send(JSON.stringify(groupedCourses));
  //   console.log(JSON.stringify(result.rows))
  //   res.send(JSON.stringify(groupBySemester(result.rows)));

  // });
};

// Helper function to group the courses by semester
const groupBySemester = courses => {
  const groups = {};
  courses.forEach(course => {
    const key = `${course.semester} ${course.year}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(course);
  });
  return Object.entries(groups).map(([name, courses]) => ({ name, courses }));
};

// create a http server
const server = http.createServer((req,res) => {
    
    if(req.url === '/home/getUserData') {
        
        getUserData(req,res);
    }
    if(req.url === '/home/getCourses') {
        getCourses(req,res);
    }
    res.end();

}).listen(4000,() => {
    console.log('server is running on port 4000');
});

// module.exports = {
//   getUserData,
//   getCourses,
// }