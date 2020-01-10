import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
    apiUrl: string = 'http://localhost:5000/api/';
    constructor(private http: HttpClient) { }

    // Courses CRUD
    getCourses() {
        return this.http.get(this.apiUrl + 'courses');
    }
    addCourse(courseRequest: any) {
        return this.http.post(this.apiUrl + 'courses', courseRequest);
    }
    updateCourse(courseRequest: any) {
        return this.http.put(this.apiUrl + 'courses/' + courseRequest.id, courseRequest);
    }

    deleteCourse(id: string) {
        return this.http.delete(this.apiUrl + 'courses/' + id);
    }

    //Subjects CRUD
    getSubjects() {
        return this.http.get(this.apiUrl + 'subjects');
    }
    addSubject(subjectRequest: any) {
        return this.http.post(this.apiUrl + 'subjects', subjectRequest);
    }
    updateSubject(subjectRequest: any) {
        return this.http.put(this.apiUrl + 'subjects/' + subjectRequest.id, subjectRequest);
    }
    deleteSubject(id: string) {
        return this.http.delete(this.apiUrl + 'subjects/' + id);
    }

    //Students CRUD
    getStudents() {
        return this.http.get(this.apiUrl + 'students');
    }
    addStudent(studentRequest: any) {
        return this.http.post(this.apiUrl + 'students', studentRequest);
    }
    updateStudent(studentRequest: any) {
        return this.http.put(this.apiUrl + 'students/' + studentRequest.id, studentRequest);
    }
    deleteStudent(id: string) {
        return this.http.delete(this.apiUrl + 'students/' + id);
    }
    deassignFromSubject(studentId: string, subjectId: string) {
        return this.http.delete(this.apiUrl + 'students/' + studentId + '/deassign/' + subjectId);
    }
    assignToSubject(studentId: string, subjectId: string) {
        return this.http.post(this.apiUrl + 'students/' + studentId + '/assign/' + subjectId, {});
    }

    //Teachers CRUD
    getTeachers() {
        return this.http.get(this.apiUrl + 'teachers');
    }
    addTeacher(teacherRequest: any) {
        return this.http.post(this.apiUrl + 'teachers', teacherRequest);
    }
    updateTeacher(teacherRequest: any) {
        return this.http.put(this.apiUrl + 'teachers/' + teacherRequest.id, teacherRequest);
    }
    deleteTeacher(id: string) {
        return this.http.delete(this.apiUrl + 'teachers/' + id);
    }

}
