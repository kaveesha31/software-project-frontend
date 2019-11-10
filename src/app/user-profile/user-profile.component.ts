import {Component, OnInit} from '@angular/core';
import {AuthenticationService, ReservationService, UserService} from '../_services';
import {Router, RouterModule} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  edit = false;
  angForm: FormGroup;
  currentUser;
  reservations: any[];
  oldReservations: any[];

  constructor(private userService: UserService,
              private router: RouterModule,
              private fb: FormBuilder,
              private reservationService: ReservationService,
              private auth: AuthenticationService) {
  }

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
        this.getReservations();
        this.getOldReservations();
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

  getReservations() {
    this.reservationService.getByUser(this.auth.getCurrentUserId()).subscribe((val: any[]) => {
      console.log(val);
      this.reservations = val;
    });
  }

  getOldReservations() {
    this.reservationService.getOldByUser(this.auth.getCurrentUserId()).subscribe((val: any[]) => {
      console.log(val);
      this.oldReservations = val;
    });
  }

  deleteReservation(id) {
    this.reservationService.deleteReservation(id).subscribe(res => {
      const index = this.reservations.findIndex(x => x['_id'] === id);
      console.log(index);
      this.reservations.splice(index, 1);
    });
  }
}
