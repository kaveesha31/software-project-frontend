import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';

import {User} from '../_models';
import {UserService, AuthenticationService, VehicleService, AlertService, ReservationService} from '../_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({templateUrl: 'home.component.html',
            styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  homeForm: FormGroup;
  contactForm: FormGroup;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  vehicles = [];
  loading = false;
  submitted = false;

  reserveForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
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
      key: [''],
      user: [this.authenticationService.getCurrentUserId()],
      vehicle: [''],
      seats: [-1]
    });

    this.contactForm = this.fb.group({
      username :  ['', Validators.required],
      email : ['', Validators.required],
      subject :['', Validators.required],
    })
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

        this.router.navigate(['payment']);
        // this.getVehicleList();
      },
      err => {
        console.log(err);
      });
  }

  feedback(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.feedback(this.contactForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.contactForm.reset();
          console.log('success')
          console.log(data)
          this.alertService.success('feedback send successfully', true);
          this.router.navigate(['/home']);
        },
        error => {
          console.log('failed')
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
