import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {
  entity: Object;
  entityName: string;
  editableKeys: Array<string> = [];
  form: FormGroup;
  keys: Array<string> = [];

  teachers: Array<any> = [];
  courses: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.editableKeys = data.editableKeys;
    this.teachers = data.teachers;
    this.courses = data.courses;
  }

  ngOnInit() {
    this.form = this.createForm(this.entity);
  }

  createForm(entity: Object): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});
    Object.keys(entity)
      .forEach(key => {
        const control = this.formBuilder.control(entity[key]);
        formGroup.addControl(key, control);
      });
    return formGroup;
  }

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  getType(field: string) {
    if (field.includes('Id')) {
      return 'select'
    };
    if (field.includes('day')) {
      return 'date';
    }
    return 'string';
  }

  getList(field: string) {
    switch (field) {
      case 'teacherId':
        return this.teachers;
      case 'courseId':
        return this.courses;
    }
  }
}
