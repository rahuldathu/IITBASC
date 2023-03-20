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


async function getDeptsRunningCourses(res) {

    const client = new pg.Client({
        host: 'localhost',
        port: 5432,
        user: 'rahul1',
        password: 'rahul1',
        database: 'rahul'    
      });
 
  await client.connect();

  const query = `
    SELECT D.dept_name
    FROM course C
    JOIN department D ON C.dept_name = D.dept_name
    JOIN teaches T ON C.course_id = T.course_id
    JOIN reg_dates RD ON RD.semester = T.semester AND RD.year = T.year
    WHERE RD.start_time <= CURRENT_TIMESTAMP AND RD.end_time >= CURRENT_TIMESTAMP
    GROUP BY D.dept_name;
  `;

  const result = await client.query(query);
  await client.end();

  res.send(JSON.stringify(result.rows));
//   return res.json({
//     data: result.rows
//   });
}

async function getDeptCourses(deptId, res) {

    const client = new pg.Client({
        host: 'localhost',
        port: 5432,
        user: 'rahul1',
        password: 'rahul1',
        database: 'rahul'    
      });

  await client.connect();

  const query = `
    SELECT C.course_id, C.title
    FROM courses C
    JOIN department D ON C.dept_name = D.dept_name
    JOIN teaches T ON C.course_id = T.course_id
    JOIN reg_dates RD ON RD.semester = T.semester AND RD.year = T.year
    WHERE D.dept_name = '${deptId}' AND RD.start_time <= CURRENT_TIMESTAMP AND RD.end_time >= CURRENT_TIMESTAMP
    ORDER BY C.course_id;
  `;

  const result = await client.query(query);
  await client.end();

  //  res.send(JSON.stringify(result.rows));
  return res.json({
    data: result.rows
  });
}

module.export = {
    getDeptsRunningCourses,
    getDeptCourses
}