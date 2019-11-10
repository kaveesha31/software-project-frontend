import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService, VehicleService} from '../_services';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vid;
  vehicle;
  vehicleKeys;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.vid = val.id;
      this.getVehicleById();
    });
  }

  getVehicleById() {
    this.vehicleService.getVehicleById(this.vid).subscribe((val: any) => {
      console.log(val);
      this.vehicle = val;
      this.vehicleKeys = Object.keys(this.vehicle);

    });
  }

  camel(str) {
    return str.split(/(?=[A-Z])/).join(' ');
  }

}
