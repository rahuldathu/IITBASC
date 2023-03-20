import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "./App.css";

const Instructor = () => {
  const [instructorData, setInstructorData] = useState(null);
  const [currentSemesterCourses, setCurrentSemesterCourses] = useState([]);
  const [previousSemesterCourses, setPreviousSemesterCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { instructor_id } = useParams();

  useEffect(() => {
    // const instructorId = props.match.params.instructor_id;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/instructor/:${instructor_id}`);
        const data = await response.json();
        setInstructorData(data.instructorData);
        setCurrentSemesterCourses(data.currentSemesterCourses);
        setPreviousSemesterCourses(data.previousSemesterCourses);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [instructor_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!instructorData) {
    return null;
  }

  return (
    <div className="Instructor">
      <h2>Instructor Information</h2>
      <p>Name: {instructorData.name}</p>
      <p>Department: {instructorData.dept_name}</p>
      <h3>Current Semester Courses (sorted by course_id in lexical order)</h3>
      <ul>
        {currentSemesterCourses.map((course) => (
          <li key={course.course_id}>
            {course.course_id} - {course.title}
          </li>
        ))}
      </ul>
      <h3>
        Previous Semester Courses (sorted by semester in decreasing order)
      </h3>
      <ul>
        {previousSemesterCourses.map((course) => (
          <li key={course.course_id}>
            {course.course_id} - {course.title} 
            {/* {course.course_id} - {course.title} ({course.semester}, {course.year}) */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instructor;
