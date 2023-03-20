const express = require('express');
// const router = express.Router();
const pg = require('pg');

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'rahul1',
  password: 'rahul1',
  database: 'rahul'    
});

client.connect();

const courses = async  (req, res) => {
    client.query(`
      SELECT semester, year, course.*
      FROM takes
      JOIN course ON takes.course_id = course.course_id
      WHERE takes.id = $1
      ORDER BY year DESC, semester DESC, title DESC
    `, [req.user.id], (err, result) => {
      if (err) throw err;
      const courses = result.rows.reduce((semesters, row) => {
        const semester = semesters.find(s => s.name === row.semester + row.year);
        if (semester) {
          semester.courses.push({
            course_id: row.course_id,
            title: row.title,
          });
        } else {
          semesters.push({
            name: row.semester + row.year,
            courses: [{
              course_id: row.course_id,
              title: row.title,
            }],
          });
        }
        return semesters;
      }, []);
      res.send(courses);
    });
  };

  module.exports = {
    courses
};
