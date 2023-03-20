import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Course = (props) => {
  const [course, setCourse] = useState({});
  const [prereqs, setPrereqs] = useState([]);
  const [instructor, setInstructor] = useState({});
  const [error, setError] = useState(false);
  const { course_id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/course/:${course_id}`);
        const data = await res.json();
        setCourse(data.course);
        setPrereqs(data.prereqs);
        setInstructor(data.instructor);
      } catch (err) {
        setError(true);
      }
    };
    fetchCourse();
  }, [course_id]);

  if (error) {
    return <div>An error occurred while fetching course information.</div>;
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <p>
        Course ID: {course.course_id}
        <br />
        Credits: {course.credits}
        <br />
        Building: {course.building}
        <br />
        Room Number: {course.room_number}
      </p>
      <h3>Prerequisites:</h3>
      <ul>
        {prereqs.map((prereq) => (
          <li key={prereq.id}>
            <a href={`/course/${prereq.id}`}>{prereq.name}</a>
          </li>
        ))}
      </ul>
      <p>
        Instructor:{" "}
        <a href={`/instructor/${instructor.id}`}>{instructor.name}</a>
      </p>
    </div>
  );
};

export default Course;
