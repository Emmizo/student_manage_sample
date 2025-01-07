import Array "mo:base/Array";
import List "mo:base/List";

actor StudentManagement {
  //Types for students, Courses and Attendance

  type Student = {
    id : Nat;
    name : Text;
    email : Text;
    age : Nat;
  };
  type Course = {
    id : Nat;
    name : Text;
    description : Text;
  };
  type Attendance = {
    id : Nat;
    studentId : Nat;
    courseId : Nat;
    date : Text;
    status : Bool; //True for presnt, false for absent
  };

  //Storage
  stable var students : [Student] = [];
  stable var courses : [Course] = [];
  stable var attendanceRecords : [Attendance] = [];

  // Counter to auto-increment IDs
  stable var studentCounter : Nat = 0;
  stable var courseCounter : Nat = 0;
  stable var attendanceCounter : Nat = 0;

  //functions for students
  public func addStudent(name : Text, email : Text, age : Nat) : async Student {
    studentCounter += 1;
    let newStudent = {
      id = studentCounter;
      name = name;
      email = email;
      age = age;
    };
    students := Array.append(students, [newStudent]);
    return newStudent;
  };

  public func getStudents() : async [Student] {
    return students;
  };
  public func deleteStudent(studentId : Nat) : async Bool {
    let updatedStudents = Array.filter<Student>(students, func(s) { s.id != studentId });
    let deleted = updatedStudents.size() != students.size();
    students := updatedStudents;
    return deleted;
  };

  //Functions for courses
  public func addCourse(name : Text, description : Text) : async Course {
    courseCounter += 1;
    let newCourse = {
      id = courseCounter;
      name = name;
      description = description;
    };
    courses := Array.append(courses, [newCourse]);
    return newCourse;
  };
  public func getCourses() : async [Course] {
    return courses;
  };

  //functions for attendance
  public func markAttendance(studentId : Nat, courseId : Nat, date : Text, status : Bool) : async Bool {
    attendanceCounter += 1;
    let record = {
      id = attendanceCounter;
      studentId = studentId;
      courseId = courseId;
      date = date;
      status = status;
    };
    attendanceRecords := Array.append(attendanceRecords, [record]);
    return true;
  };

  public func getAttendance(studentId : Nat, courseId : Nat) : async [{
    studentName : Text;
    courseName : Text;
    date : Text;
    status : Bool;
  }] {
    // Filter attendance records for the given studentId and courseId
    let filteredAttendance = Array.filter<Attendance>(
      attendanceRecords,
      func(a) { a.studentId == studentId and a.courseId == courseId },
    );

    // Map attendance records to include studentName and courseName
    return Array.map<Attendance, { studentName : Text; courseName : Text; date : Text; status : Bool }>(
      filteredAttendance,
      func(a) {
        let studentName = switch (Array.find<Student>(students, func(s) { s.id == a.studentId })) {
          case (?student) { student.name }; // Found student
          case (_) { "Unknown Student" }; // Not found
        };
        let courseName = switch (Array.find<Course>(courses, func(c) { c.id == a.courseId })) {
          case (?course) { course.name }; // Found course
          case (_) { "Unknown Course" }; // Not found
        };

        {
          studentName = studentName;
          courseName = courseName;
          date = a.date;
          status = a.status;
        };
      },
    );
  };
};
