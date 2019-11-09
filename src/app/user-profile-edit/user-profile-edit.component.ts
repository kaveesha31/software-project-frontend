import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  angForm: FormGroup;
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private FormBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      contactNumber: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.UserService.editUserProfile(params['id']).subscribe(res => {
        this.user = res;
    });
  });
  }

  updateUserProfile(firstName, lastName, userName, city, contactNumber) {
    this.route.params.subscribe(params => {
       this.UserService.updateUserProfile(firstName);
       this.router.navigate(['/user-profile']);
 });

}

}
