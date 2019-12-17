import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Array<any>;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getStudents().subscribe((res: any) => this.students = res);
  }
}
