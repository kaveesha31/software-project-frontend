import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { element } from '@angular/core/src/render3';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  register(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  sendEmail(user) {
    return this.http.post(environment.apiBaseUrl + '/sendEmail', user);
  }

  editUserProfile(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/editUserProfile/${id}`);
  }

  updateUserProfile(obj) {//firstName, lastName, userName, city, contactNumber, id) {

    // const obj = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     userName: userName,
    //     city: city,
    //     contactNumber: contactNumber
    //   };
    console.log(this.auth.getCurrentUserId());
    // return;
    return this
      .http
      .put(`${environment.apiBaseUrl}/updateUserProfile/${this.auth.getCurrentUserId()}`, obj);
  }

  displayUsers() {
    return this.http.get(environment.apiBaseUrl + '/displayUsers');
  }

  deleteUser(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/deleteUser/${id}`);
  }

  // //role
  // roleMatch(allowedRoles) : boolean {
  //   var isMatch = false;
  //   var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  //   var userRole = payload.role;
  //   allowedRoles.forEach(element => {
  //     if(userRole == element){
  //       isMatch = true;
  //       return false;
  //     }
  //   });
  //   return isMatch;
  // }
}
