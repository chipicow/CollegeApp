import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppService } from './app.service';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      CoursesComponent,
      NavBarComponent,
      SubjectsComponent,
      StudentsComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(AppRoutes),
      HttpClientModule,
      MatIconModule
   ],
   providers: [
      AppService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
