import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Array<any>;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCourses().subscribe((res: any) => this.courses = res);
  }


  edit(course: any) {
    course.name = 'Edited this name'
    this.appService.updateCourse(course).subscribe(
      _ => {
        let courseIndex = this.courses.findIndex(c => c.id == course.id);
        this.courses[courseIndex] = course;
      }
    );
  }

  delete(id: string) {
    this.appService.deleteCourse(id).subscribe(_ => {
      let courseIndex = this.courses.findIndex(course => course.id == id);
      this.courses.splice(courseIndex, 1);
    });
  }

  getTotalStudents(course) {
    const students = [];
    course.subjects.forEach(subject => {
      subject.studentSubjects.forEach(sb => {
        if (!students.some(e => e === sb.studentId)) {
          students.push(sb.studentId);
        }
      });
    });
    return students.length;
  }

  getTotalTeachers(course) {
    const teachers = [];
    course.subjects.forEach(subject => {
      if (!teachers.some(e => e === subject.teacherId)) {
        teachers.push(subject.teacherId);
      }
    });
    return teachers.length;
  }
}
