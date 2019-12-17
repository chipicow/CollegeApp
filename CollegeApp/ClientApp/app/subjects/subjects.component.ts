import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Array<any>;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getSubjects().subscribe((res: any) => this.subjects = res);
  }
}
