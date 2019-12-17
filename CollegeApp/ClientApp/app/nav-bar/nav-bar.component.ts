import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  components: Array<any> = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.components.push(
      { name: 'Courses', route: 'courses' },
      { name: 'Subjects', route: 'subjects' },
      { name: 'Students', route: 'students' });
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
