import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css'],
})
export class StudentClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  student_classes: any[];
  students: any[];
  classes: any[];

  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { 
    this.getStudentClasses();
    this.getStudents();
    this.getClasses();
   }
 
  getStudentClasses() {
    this.dataService.getRecords("student_class")
      .subscribe(
        student_classes => this.student_classes = student_classes,
        error =>  this.errorMessage = <any>error);
  }

  getStudents() {
    this.dataService.getRecords("student")
      .subscribe(
        students => this.students = students,
        error =>  this.errorMessage = <any>error);
  }

  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudentClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("student_class", id)
          .subscribe(
            student_class => {this.successMessage = "Record(s) deleted succesfully"; this.getStudentClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}

