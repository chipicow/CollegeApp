import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  editableKeys = ['name', 'salary', 'birthday'];
  teachers: Array<any>;
  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit() {
    this.appService.getTeachers().subscribe((res: any) => this.teachers = res);
  }

  onEdit(teacher: any) {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: teacher,
        entityName: 'Teacher',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.updateTeacher(res).subscribe(
          _ => {
            let teacherIndex = this.teachers.findIndex(c => c.id == res.id);
            this.teachers[teacherIndex] = res;
          }
        );
      }
    });
  }

  onAdd() {
    this.dialog.open(GenericModalComponent, {
      data: {
        entity: { name: '', birthday: null, salary: '' },
        entityName: 'Teacher',
        editableKeys: this.editableKeys
      }
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.appService.addTeacher(res).subscribe(
          teacherFromDb => {
            this.teachers.push(teacherFromDb);
          }
        );
      }
    });
  }

  delete(id: string) {
    this.appService.deleteTeacher(id).subscribe(_ => {
      let teacherIndex = this.teachers.findIndex(course => course.id == id);
      this.teachers.splice(teacherIndex, 1);
    });
  }
}
