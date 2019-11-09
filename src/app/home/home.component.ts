import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '../_models';
import {UserService, AuthenticationService, VehicleService} from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  vehicles = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private vehicleService: VehicleService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getVehicleList();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  getVehicleList() {
    this.vehicleService.getAllVehicles().subscribe((val: any[]) => {
        console.log(val);
        this.vehicles = val;
      }
    );
  }
}
