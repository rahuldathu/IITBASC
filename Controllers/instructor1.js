const express = require("express");
const pg = require('pg');

const app = express();
const port = 8080;

const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'rahul1',
    password: 'rahul1',
    database: 'rahul'    
  });

client.connect();
  

// function checkIfLoggedIn(req) {
//     return !!req.session.user;
//   }
  

// Helper function to fetch instructor data from the database
async function getInstructorData(instructorId) {
  const instructorDataQuery = `
    SELECT name, dept_name
    FROM instructor
    WHERE id = $1
  `;

  const instructorDataResult = await client.query(instructorDataQuery, [
    instructorId,
  ]);

  return instructorDataResult.rows[0];
}

// Helper function to fetch current semester courses
async function getCurrentSemesterCourses(instructorId) {
  const currentSemesterQuery = `
    SELECT year, semester
    FROM reg_dates
    WHERE start_time <= CURRENT_TIMESTAMP
    AND end_time >= CURRENT_TIMESTAMP
  `;

  const currentSemesterResult = await client.query(currentSemesterQuery);

  const currentSemesterYear = currentSemesterResult.rows[0].year;
  const currentSemesterSemester = currentSemesterResult.rows[0].semester;

  const currentSemesterCoursesQuery = `
    SELECT course.course_id, course.title
    FROM teaches
    JOIN course ON course.course_id = teaches.course_id
    WHERE teaches.id = $1
    AND teaches.year = $2
    AND teaches.semester = $3
    ORDER BY course.course_id
  `;

  const currentSemesterCoursesResult = await client.query(
    currentSemesterCoursesQuery,
    [instructorId, currentSemesterYear, currentSemesterSemester]
  );

  return currentSemesterCoursesResult.rows;
}

// Helper function to fetch previous semester courses
async function getPreviousSemesterCourses(instructorId) {
  const previousSemesterQuery = `
    SELECT year, semester
    FROM reg_dates
    WHERE end_time < CURRENT_TIMESTAMP
    ORDER BY year DESC, semester DESC
    LIMIT 1
    `;

    const previousSemesterResult = await client.query(previousSemesterQuery);
  
    const previousSemesterYear = previousSemesterResult.rows[0].year;
    const previousSemesterSemester = previousSemesterResult.rows[0].semester;
  
    const previousSemesterCoursesQuery = `
      SELECT course.course_id, course.title, teaches.semester, teaches.year
      FROM teaches
      JOIN course ON course.course_id = teaches.course_id
      WHERE teaches.id = $1 AND (semester, year) NOT IN (
        SELECT semester, year FROM reg_dates WHERE NOW() BETWEEN start_time AND end_time
      )
      ORDER BY year DESC, semester DESC, course_id
    `;
  
    const previousSemesterCoursesResult = await client.query(
      previousSemesterCoursesQuery,
      [instructorId]
    );
  
    return previousSemesterCoursesResult.rows;
  }

const instructorId = '10101'
const vgetInstructorData =  getInstructorData(instructorId);
console.log(vgetInstructorData);
vgetInstructorData.then ((result) => {
  console.log(result);
})
console.log('                                               ');
const vgetCurrentSemesterCourses = getCurrentSemesterCourses(instructorId);
console.log(vgetCurrentSemesterCourses);
vgetCurrentSemesterCourses.then ((result) => {
  console.log(result);
});
console.log('                                               ');
const vgetPreviousSemesterCourses = getPreviousSemesterCourses(instructorId)
console.log(vgetPreviousSemesterCourses);
vgetPreviousSemesterCourses.then ((result) => {
  console.log(result);
});
console.log('       ');


//   app.get("/instructor/:instructor_id", async (req, res) => {
//     // const instructorId = req.params.instructor_id;
//     // const isLoggedIn = checkIfLoggedIn(req);
//     const instructorId = '10101';
  
//     // if (!isLoggedIn) {
//     //     return res.status(401).json({
//     //       error: "Unauthorized: You must be logged in to access this resource."
//     //     });
//     //     }
    
//     try{

//         // Fetch instructor data from the database
//         const instructorData = await getInstructorData(instructorId);
    
//         // Fetch current semester courses
//         const currentSemesterCourses = await getCurrentSemesterCourses(instructorId);
    
//         // Fetch previous semester courses
//         const previousSemesterCourses = await getPreviousSemesterCourses(instructorId);
    
//         // Return the response
//         res.status(200).json({
//         instructorData,
//         currentSemesterCourses,
//         previousSemesterCourses,
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: "Internal Server Error: Failed to retrieve instructor information."
//           });
//     }
    
//   });
  
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });


  