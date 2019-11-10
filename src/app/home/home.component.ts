import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '../_models';
import {UserService, AuthenticationService, VehicleService, ReservationService} from '../_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  vehicles = [];

  reserveForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);
    this.reserveForm = this.fb.group({
      from: [today as Date, Validators.required],
      to: [tommorow as Date, Validators.required],
      user: [this.authenticationService.getCurrentUserId()],
      vehicle: ['']
    });
    this.getVehicleList();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  getVehicleList() {
    this.vehicleService.getAllVehicles(this.reserveForm.value).subscribe((val: any[]) => {
        console.log(val);
        this.vehicles = val;
      }
    );
  }

  reserve(vid) {
    this.reserveForm.patchValue({vehicle: vid});
    this.reservationService.addReservation(this.reserveForm.value).subscribe(val => {
        console.log(val);
        alert('Reserved');
        this.getVehicleList();
      },
      err => {
        console.log(err);
      });
  }
}
