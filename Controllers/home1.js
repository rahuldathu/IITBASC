const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'rahul1',
  password: 'rahul1',
  database: 'rahul'    
});

client.connect(); 
const id = '12345'


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

const query = `
    SELECT *
    FROM student
    WHERE id = $1
    `;
  
client.query(query, [id], (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack);
      }
    console.log(JSON.stringify(result.rows[0]))
    console.log('                                           ')
    });
      
const query2 = `
    SELECT t.sec_id, t.semester, t.year, c.course_id, title, credits
    FROM takes t
    JOIN section s ON t.course_id = s.course_id AND t.sec_id = s.sec_id AND t.semester = s.semester AND t.year = s.year
    JOIN course c ON s.course_id = c.course_id
    WHERE id = $1 AND (t.semester, t.year) < (SELECT semester, year FROM reg_dates ORDER BY year DESC, semester DESC LIMIT 1)
    ORDER BY  year DESC, semester DESC, title DESC
  `;

client.query(query2, [id], (err, result) => {
    if (err) {
        return console.error('Error executing query', err.stack);
    }
    console.log(JSON.stringify(result.rows))
    // console.log("########################################");
    console.log('                                           ')
    console.log('                                           ')
    console.log(JSON.stringify(groupBySemester(result.rows)))
    });