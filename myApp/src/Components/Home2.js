import React, { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/home')
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        setCourses(data.courses);
      });
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Department:</td>
            <td>{user.dept_name}</td>
          </tr>
          <tr>
            <td>Total Credits:</td>
            <td>{user.tot_cred}</td>
          </tr>
        </tbody>
      </table>
      <h2>Courses Registered in Previous Semester</h2>
      {courses.map(semester => (
        <table key={semester.semester}>
          <thead>
            <tr>
              <th colSpan={3}>Semester: {semester.semester}</th>
            </tr>
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            {semester.courses
              .sort((a, b) => b.title.localeCompare(a.title))
              .map(course => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Home;
