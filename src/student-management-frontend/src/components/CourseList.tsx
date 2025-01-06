import React, { useEffect, useState } from 'react'
import backendActor from '../API/backendActor'

interface Course{
    id: number;
    name: string;
    description: string;
}
const CourseList = ()=>{
const [courses, setCourses] = useState<Course[]>([]);
const [newCourse, setNewCourse] = useState({name:"", description:""});

const fetcchCourses = async () =>{
    try{
    const data = await backendActor.getCourses() as Course[];
    setCourses(data);
    }catch(error){
        console.error("Error fetching students:", error);
    }
};
const addCourse = async ()=>{
    await backendActor.addCourse(newCourse.name,newCourse.description);
    fetcchCourses();
    setNewCourse({name:"", description:""});
}
useEffect(()=>{
    fetcchCourses();
},[]);
  return (
    <div className="container">
        <h2 >Course List</h2>
        <div className="d-flex justify-content-center">
           <div className='mr-md-5 mr-lg-3'>
        <ul >
            {courses.map((course)=>(
                <li key={course.id}>
                    <div>{course.name}</div><div>{course.description}</div>
                </li>
            ))}
        </ul>
        </div>
        <div className="border-start" style={{height: "100vh",margin: "10px"}}></div> 
        <div className='col-6'>
            <input 
            className="form-control mt-2"
            type='text'
            placeholder='Course name'
            value = {newCourse.name}
            onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} />
            <input 
            className="form-control mt-2"
            type='text'
            placeholder='Description'
            value = {newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} />
            <button className="btn btn-primary mt-2" onClick ={addCourse}>Add course</button>
        </div>
    </div>
    </div>
  )
}

export default CourseList