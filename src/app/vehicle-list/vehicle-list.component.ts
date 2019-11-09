import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../_models/vehicle';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles : Vehicle[];

  constructor(private vehi: VehicleService) { }
 
  ngOnInit() {
    this.vehi.displayVehicle().subscribe((data: Vehicle[]) => {
      this.vehicles = data; 
    });
  }

  deleteVehicle(id) {
    this.vehi.deleteVehicle(id).subscribe(res => {
      const index = this.vehicles.findIndex(x => x['id'] === id);
      this.vehicles.splice(index,1);
      console.log('Deleted');
    });
  }
}
