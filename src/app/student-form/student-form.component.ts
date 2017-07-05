import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  student: object = {};

  majors: any[]; // -- needed to lookup the majors

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('student', +params['id']))
      .subscribe(student => this.student = student);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getMajors() {
    this.dataService.getRecords('major')
      .subscribe(
        majors => this.majors = majors,
        error => this.errorMessage = < any > error);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
    this.getMajors(); // -- getting majors for the select drop down
  }

  saveStudent(id) {
    if (typeof id === 'number') {
      this.dataService.editRecord('student', this.student, id)
          .subscribe(
            student => this.successMessage = 'Record updated succesfully',
            error =>  this.errorMessage = <any>error);
    }else {
      this.dataService.addRecord('student', this.student)
          .subscribe(
            student => this.successMessage = 'Record added succesfully',
            error =>  this.errorMessage = <any>error);
    }

    this.student = {};

  }

}
