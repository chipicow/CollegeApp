import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  editableKeys = ['name', 'teacherId', 'courseId'];
  subjects: Array<any>;
  teachers: Array<any>;
  courses: Array<any>;
  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit() {
    this.appService.getSubjects().subscribe((res: any) => this.subjects = res);
    this.appService.getTeachers().subscribe((res: any) => this.teachers = res);
    this.appService.getCourses().subscribe((res: any) => this.courses = res);
  }

  onEdit(subject: any) {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: subject,
        entityName: 'Subject',
        editableKeys: this.editableKeys,
        courses: this.courses,
        teachers: this.teachers
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.updateSubject(res).subscribe(
          _ => {
            res.teacher = this.teachers.find(t => t.id === res.teacherId);
            res.course = this.courses.find(c => c.id === res.courseId);
            let subjectIndex = this.subjects.findIndex(c => c.id == res.id);
            this.subjects[subjectIndex] = res;
          }
        );
      }
    });
  }

  onAdd() {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: { name: '', teacherId: null, courseId: null },
        entityName: 'Subject',
        editableKeys: this.editableKeys,
        courses: this.courses,
        teachers: this.teachers
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.addSubject(res).subscribe(
          (subjectFromDb: any) => {
            subjectFromDb.teacher = this.teachers.find(t => t.id === subjectFromDb.teacherId);
            subjectFromDb.course = this.courses.find(c => c.id === subjectFromDb.courseId);
            this.subjects.push(subjectFromDb);
          }
        );
      }
    });
  }

  delete(id: string) {
    this.appService.deleteSubject(id).subscribe(_ => {
      let subjectIndex = this.subjects.findIndex(course => course.id == id);
      this.subjects.splice(subjectIndex, 1);
    });
  }
}
