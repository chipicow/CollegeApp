import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  editableKeys = ['name'];
  courses: Array<any>;
  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit() {
    this.appService.getCourses().subscribe((res: any) => this.courses = res);
  }

  onEdit(course: any) {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: course,
        entityName: 'Course',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.updateCourse(res).subscribe(
          _ => {
            let courseIndex = this.courses.findIndex(c => c.id == res.id);
            this.courses[courseIndex] = res;
          }
        );
      }
    });
  }

  onAdd() {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: { name: '' },
        entityName: 'Course',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.addCourse(res).subscribe(
          courseFromDb => {
            this.courses.push(courseFromDb);
          }
        );
      }
    });
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

  removeSubject(subjectId: string) {
    this.appService.deleteSubject(subjectId).subscribe(_ => {
      this.appService.getCourses().subscribe((res: any) => this.courses = res);
    });
  }
}
