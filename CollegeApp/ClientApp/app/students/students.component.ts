import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  editableKeys = ['name', 'birthday', 'registrationNumber'];
  assigningIndex: number = null;
  students: Array<any>;
  subjects: Array<any>;
  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit() {
    this.appService.getStudents().subscribe((res: any) => this.students = res);
    this.appService.getSubjects().subscribe((res: any) => this.subjects = res);
  }

  onEdit(student: any) {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: student,
        entityName: 'Student',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.updateStudent(res).subscribe(
          _ => {
            let studentIndex = this.students.findIndex(c => c.id == res.id);
            this.students[studentIndex] = res;
          }
        );
      }
    });
  }

  onAdd() {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: { name: '', birthday: null, registrationNumber: '' },
        entityName: 'Student',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.addStudent(res).subscribe(
          studentFromDb => {
            this.students.push(studentFromDb);
          }
        );
      }
    });
  }

  delete(id: string) {
    this.appService.deleteStudent(id).subscribe(_ => {
      let studentIndex = this.students.findIndex(course => course.id == id);
      this.students.splice(studentIndex, 1);
    });
  }

  unassignFromSubject(studentSubject) {
    this.appService.deassignFromSubject(studentSubject.studentId, studentSubject.subjectId).subscribe(_ => {
      this.appService.getStudents().subscribe((res: any) => this.students = res);
    });
  }

  isValidSubject(studentSubjects: Array<any>, subject: any) {
    return studentSubjects.findIndex(sS => sS.subjectId == subject.id) === -1;
  }

  assignToSubject(index) {
    this.assigningIndex = index;
  }

  assign(studentId: string, matSelect: any) {
    this.assigningIndex = null;
    this.appService.assignToSubject(studentId, matSelect.value).subscribe(_ => {
      this.appService.getStudents().subscribe((res: any) => this.students = res);
    });
  }
}
