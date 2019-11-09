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

  addReservation(id, reservation: Reservation) {
    return this.http.post(environment.apiBaseUrl + '/vehicle/reserve/' + id, reservation);
  }

  displayReservation() {
    return this.http.get(environment.apiBaseUrl + '/displayReservation');
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

  deleteReservation(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/deleteReservation/${id}`);
  }


}
