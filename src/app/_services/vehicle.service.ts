import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Vehicle} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  addVehicle(vehicle) {
    return this.http.post(environment.apiBaseUrl + '/addVehicle', vehicle);
  }

  displayVehicle() {
    return this.http.get(environment.apiBaseUrl + '/displayVehicle');
  }

  getAllVehicles() {
    return this.http.get(`${environment.apiBaseUrl}/vehicle/all`);
  }

  editVehicle(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/editVehicle/${id}`);
  }


  updateVehicle(formData, id) {

    this
      .http
      .post(`${environment.apiBaseUrl}/updateVehicle/${id}`, formData)
      .subscribe(res => console.log('Done'));
  }

  deleteVehicle(id) {
    return this
      .http
      .get(`${environment.apiBaseUrl}/deleteVehicle/${id}`);
  }


}
