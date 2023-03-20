import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
// import Empty from './Components/Empty';
// import Course from './Components/Course';
// import CourseRunning from './Components/CourseRunning';
// import CourseRunningDepartment from './Components/CourseRunningDepartment'
// import DeptId from './Components/DeptId';
// import Instructor from './Components/Instructor';

function App() {
  return (
    // <div>
    //   <Login setUser={setUser} />
    //   <Register />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="course/:course_id" element={<Course />} />
        <Route path="course/running" element={<CourseRunning />} />
        <Route path="course/running/:dept_name" element={<CourseRunningDepartment />} />
        <Route path="instructor/:instructor_id" element={<Instructor />} /> */}
        {/* <Route path="*" element={<Empty />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
