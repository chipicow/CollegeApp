import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'subjects',
    component: SubjectsComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];