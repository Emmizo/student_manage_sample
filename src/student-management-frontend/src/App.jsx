import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentManagement from "./components/StudentsList"
import AttendanceManagement from './components/Attendance';
import CourseManagement from './components/CourseList';
import Navbar from "./components/Navbar";


function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentManagement />} />
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
