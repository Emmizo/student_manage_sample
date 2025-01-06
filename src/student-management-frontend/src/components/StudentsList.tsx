import React,{useEffect,useState} from "react";
import backendActor from "../API/backendActor";
interface Student {
    id: number;
    name: string;
    email: string;
    age: number;
}

const StudentsList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [newStudent, setNewStudent] = useState({name:"", email : "", age : 0});

    // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const data = await backendActor.getStudents() as Student []; // Type inferred as Student[]
      console.log("Students:", data);
      setStudents(data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const addStudent = async () => {
    await backendActor.addStudent(newStudent.name, newStudent.email, newStudent.age);
    fetchStudents();
    setNewStudent({name: "", email: "", age: 0})
  };
  useEffect(()=>{
    fetchStudents();
  },[]);
  return (
    <div className="container ">
        <h2>Student List</h2>
        <div className="d-flex justify-content-center">
          <div className="mr-3">
        <ul className="mr-3">
            {students.map((student)=>(
                <li key={student.id}>
                    {student.name} ({student.email})({student.age})
                </li>
            ))}
        </ul>
        </div>
        <div className="border-start" style={{height: "100vh",margin: "10px"}}></div>
        <div className="col-6">
            <input type ="text"
            placeholder="Enter fullname"
            value = {newStudent.name}
            onChange = {(e) => setNewStudent({...newStudent, name: e.target.value})}
            className="form-control"
            />
            <input type ="text"
            placeholder=" Enter email"
            value = {newStudent.email}
            onChange = {(e) => setNewStudent({...newStudent, email: e.target.value})}
            className="form-control mt-2"
            />
            <input type ="number"
            placeholder="Enter age"
            value = {newStudent.age}
            onChange = {(e) => setNewStudent({...newStudent, age: parseInt(e.target.value)})}
            className="form-control mt-2"
            />
            <button className="btn btn-primary mt-2" onClick={addStudent}>Add student</button>
        </div>
    </div>
    </div>
  )
}
export default StudentsList;