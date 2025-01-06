import React, { useEffect, useState } from "react";
import backendActor from "../API/backendActor";

interface Student {
    id: number;
    name: string;
    email: string;
    age: number;
}
interface Course{
    id: number;
    name: string;
}
const Attendance = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [studentId, setStudentId] = useState(0);
    const [courseId, setCourseId] = useState(0)
    const [date, setDate] = useState("");
    const [status, setStatus] =  useState<boolean>(true);
  const fetchStudents = async ()=>{
    try{
        const data = await backendActor.getStudents() as Student[];
        console.log(data)
        const formattedData =(data as any[]).map((student)=>({
            id: Number(student.id),  // Convert BigInt to number
            name: student.name,
            email: student.email,
            age: Number(student.age),
        }))
        
        setStudents(formattedData);
    }catch(error){
        console.error("Error fetching students:", error);
    }
  }
  const fetchCourses = async ()=>{
        try{
            const data = await backendActor.getCourses() as Course[];
            console.log(data)
            const formattedData = (data as any[]).map((course)=>({
                id:Number(course.id),
                name:course.name,
                description: course.descreption,

            }))
            setCourses(formattedData);
        }catch(error){
            console.error("Error fetching courses:", error);
        }
  }
    const markAttendance = async () => {
        if(!studentId || !courseId || !date){
            alert("Please select a student, course and  a date.student="+studentId+"courseId:"+courseId+"date:"+date);
            return;
        }
        try{
        const success = await backendActor.markAttendance(
            studentId,
            courseId,
            date,
            status
        );
        if (success) {
            alert("Attendance marked successfully!");
          } else {
            alert("Failed to mark attendance.");
          }
        }catch(error){
            console.error("Error marking attendance:", error);
        }
    };
    const fetchAttendance = async ()=>{
        
    }
    useEffect(() =>{
        fetchStudents();
        fetchCourses();
    },[]);

    return (
        <div className="container d-flex justify-content-center">
            <h2>Mark Attendance</h2>
            <div className="d-flex justify-content-center">
                <div className="row col-6">
                    {/** Dropdown for student selection */}
                    <div className="md-4">
                    <select 
                    value ={studentId }
                    onChange={(e) => setStudentId(Number(e.target.value))}
                    className="form-control mt-2"
                    >
                        <option value ={0} >
                            Select a student
                        </option>
                        {students.map((student)=>(
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                    </div>
                    {/* Dropdown for selecting a course */}
                    <div className="md-4">
        <select
          value={courseId }
          onChange={(e) => setCourseId(Number(e.target.value))}
          className="form-control mt-2"
        >
          <option value={0}>
            Select a course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        </div>
        <div className="md-4">
                    <input 
                    type="date"
                    value ={date}
                    onChange ={(e) =>setDate(e.target.value)}
                    className="form-control mt-2"
                    />
                    </div>
{/* Attendance status toggle */}
<div>
          <label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            Present
          </label>
        </div>
                    <button className="btn btn-primary mt-2" onClick={markAttendance}>Mark Attendance</button>
                </div>
            
        </div>
        </div>
    )

}
export default Attendance;