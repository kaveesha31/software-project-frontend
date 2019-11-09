import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  edit = false;
  angForm: FormGroup;
  currentUser;
  constructor(private userService: UserService, private router: RouterModule, private fb: FormBuilder) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.currentUser = res.user;
        this.angForm = this.fb.group({
          userName: [this.currentUser.username],
          firstName: [this.currentUser.firstName, Validators.required],
          lastName: [this.currentUser.lastName, Validators.required],
          city: [this.currentUser.city, Validators.required],
          contactNumber: [this.currentUser.contactNumber, Validators.required]
        });
      },
      err => {
        console.log(err);

      }
    );
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  updateUserProfile() {
    this.userService.updateUserProfile(this.angForm.value).subscribe(val => {
      alert('updated');
      console.log(val);
      this.currentUser = val;
      this.toggleEdit();
    });
  }
}
