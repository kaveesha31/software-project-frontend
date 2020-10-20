import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Reservation} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient
  ) {
  }

  addReservation(reservation) {
    console.log(reservation);
    return this.http.post(environment.apiBaseUrl + '/vehicle/reserve', reservation);
  }

  addRating(reservation){
    return this.http.post(environment.apiBaseUrl + '/reservation/rate', reservation);
  }

  displayReservation() {
    return this.http.get(environment.apiBaseUrl + '/displayReservation');
  }

  getByUser(id) {
    return this.http.get(environment.apiBaseUrl + '/reservation/user/' + id);
  }

  getOldByUser(id) {
    return this.http.get(environment.apiBaseUrl + '/reservation/old/user/' + id);
  }

  editReservation(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/editReservation/${id}`);
  }


  updateReservation(reservingDate, returningDate, destination, daysExpected, id) {

    const obj = {
      reservingDate: reservingDate,
      returningDate: returningDate,
      destination: destination,
      daysExpected: daysExpected,

    };
    this
      .http
      .put(`${environment.apiBaseUrl}/updateReservation/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  markAsComplete(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/markAsCompleted/${id}`);
  }

  deleteReservation(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/deleteReservation/${id}`);
  }


}
