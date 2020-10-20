
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: User;
  role;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.role = this.authenticationService.getCurrentUserRole();
    console.log(this.role);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login-new']);

  }
}
