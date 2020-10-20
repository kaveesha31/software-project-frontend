import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {User} from '../_models';
import {Feedback} from '../_models';
import {element} from '@angular/core/src/render3';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {
  }

  register(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  resetPassword(val){
    return this.http.post(environment.apiBaseUrl + '/resetPassword', val);
  }

  getEmail(val) {
    return this.http.post(environment.apiBaseUrl + '/getEmail', val);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getUserById(id) {
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
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

  updateImage(form : FormData){
    return this.http.post(`${environment.apiBaseUrl}/updateProfileImage/${this.auth.getCurrentUserId()}`,form)
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

  feedback(feedback: Feedback) {
    return this.http.post(environment.apiBaseUrl + '/feedback', feedback);
  }

  getFeedbackById(id) {
    return this.http.get(environment.apiBaseUrl + '/feedback/' + id);
  }

  displayFeedback(){
    return this.http.get(environment.apiBaseUrl + '/displayFeedback');
  }

  deletefeedback(id){
    return this.http.get(`${environment.apiBaseUrl}/deleteFeedback/${id}`);
  }
}
