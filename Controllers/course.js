const express = require('express');
const router = express.Router();
const pg = require('pg');


const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'rahul1',
  password: 'rahul1',
  database: 'rahul'    
});


async function getCourse(req, res) {
//   const client = new Client();
  await client.connect();

  const courseId = req.params.course_id;
  const courseQuery = `SELECT c.course_id, c.title, c.credits, c1.building, c1.room_number
                      FROM course c
                      JOIN classroom cl ON c.building = cl.building AND c.room_number = cl.room_number
                      WHERE c.course_id = '${courseId}'`;
  const prereqQuery = `SELECT p.prereq_id, p.title
                      FROM prereq p
                      JOIN course c ON p.prereq_id = c.course_id
                      WHERE p.course_id = '${courseId}'`;
  const instructorQuery = `SELECT i.id, i.name
                           FROM instructor i
                           JOIN teaches t ON i.id = t.id
                           WHERE t.course_id = '${courseId}'`;

  const courseData = await client.query(courseQuery);
  const prereqData = await client.query(prereqQuery);
  const instructorData = await client.query(instructorQuery);

  const course = {
    course_id: courseData.rows[0].course_id,
    title: courseData.rows[0].title,
    credits: courseData.rows[0].credits,
    building: courseData.rows[0].building,
    room_number: courseData.rows[0].room_number,
    prerequisites: prereqData.rows,
    instructor: instructorData.rows[0]
  };

//   await client.end();
  res.json(course);
  // res.send(JSON.stringify(course))
}

module.exports = {
  getCourse
};
