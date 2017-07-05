import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  instructor: object = {};

  majors: any[]; // -- needed to lookup the majors

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('instructor', +params['id']))
      .subscribe(instructor => this.instructor = instructor);
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

  saveInstructor(id) {
    if (typeof id === 'number') {
      this.dataService.editRecord('instructor', this.instructor, id)
          .subscribe(
            instructor => this.successMessage = 'Record updated succesfully',
            error =>  this.errorMessage = <any>error);
    }else {
      this.dataService.addRecord('instructor', this.instructor)
          .subscribe(
            instructor => this.successMessage = 'Record added succesfully',
            error =>  this.errorMessage = <any>error);
    }

    this.instructor = {};

  }

}
