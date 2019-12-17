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
        return this.http.post(this.apiUrl + 'courses', courseRequest, { observe: 'response' });
    }
    updateCourse(courseRequest: any) {
        return this.http.put(this.apiUrl + 'courses/' + courseRequest.id, courseRequest, { observe: 'response' });
    }
    deleteCourse(id: string) {
        return this.http.delete(this.apiUrl + 'courses/' + id, { observe: 'response' });
    }

    //Subjects CRUD
    getSubjects() {
        return this.http.get(this.apiUrl + 'subjects');
    }
    addSubject(subjectRequest: any) {
        return this.http.post(this.apiUrl + 'subjects', subjectRequest, { observe: 'response' });
    }
    updateSubject(subjectRequest: any) {
        return this.http.put(this.apiUrl + 'subjects/' + subjectRequest.id, subjectRequest, { observe: 'response' });
    }
    deleteSubject(id: string) {
        return this.http.delete(this.apiUrl + 'subjects/' + id, { observe: 'response' });
    }

    //Students CRUD
    getStudents() {
        return this.http.get(this.apiUrl + 'students');
    }
    addStudent(studentRequest: any) {
        return this.http.post(this.apiUrl + 'students', studentRequest, { observe: 'response' });
    }
    updateStudent(studentRequest: any) {
        return this.http.put(this.apiUrl + 'students/' + studentRequest.id, studentRequest, { observe: 'response' });
    }
    deleteStudent(id: string) {
        return this.http.delete(this.apiUrl + 'students/' + id, { observe: 'response' });
    }

}
