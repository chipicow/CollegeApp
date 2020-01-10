import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppService } from './app.service';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentsComponent } from './students/students.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TeachersComponent } from './teachers/teachers.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      CoursesComponent,
      NavBarComponent,
      SubjectsComponent,
      StudentsComponent,
      TeachersComponent,
      GenericModalComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BrowserModule,
      RouterModule.forRoot(AppRoutes),
      ReactiveFormsModule,
      HttpClientModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatMomentDateModule
   ],
   providers: [
      AppService,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      GenericModalComponent
   ],
})
export class AppModule { }
