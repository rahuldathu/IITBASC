// import React, { useState, useEffect } from 'react';
// // import axios  from 'axios';

// const Home = () => {
//   const [user, setUser] = useState({});
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetch('/home')
//       .then(res => res.json())
//       .then(data => {
//         setUser(data.user);
//         setCourses(data.courses);
//       })
//       .catch(err => {
//         setError(err.toString());
//         console.error(err);
//       });
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>User Information</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Department Name</th>
//             <th>Total Credits</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{user.id}</td>
//             <td>{user.name}</td>
//             <td>{user.dept_name}</td>
//             <td>{user.tot_cred}</td>
//           </tr>
//         </tbody>
//       </table>
//       <h2>Courses Registered in Previous Semesters</h2>
//       {courses.map(semester => (
//         <table key={semester.semester}>
//           <thead>
//             <tr>
//               <th colSpan="4">Semester: {semester.semester}</th>
//             </tr>
//             <tr>
//               <th>Course ID</th>
//               <th>Title</th>
//               <th>Credits</th>
//               <th>Building</th>
//               <th>Room No</th>
//             </tr>
//           </thead>
//           <tbody>
//             {semester.courses.map(course => (
//               <tr key={course.course_id}>
//                 <td>{course.course_id}</td>
//                 <td>{course.title}</td>
//                 <td>{course.credits}</td>
//                 <td>{course.building}</td>
//                 <td>{course.room_no}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ))}
//     </div>
//   );
// };

// export default Home;

import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home