import React, { useState, useEffect } from "react";

const CourseRunning = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("/course/running")
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Departments Offering Courses in Current Semester:</h2>
      <ul>
        {departments.map(department => (
          <li key={department.department_name}>
            <a href={`/course/running/:${department.department_name}`}>
              {department.department_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRunning;
