import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, UserService, AuthenticationService} from '../_services';
import {VehicleService} from '../_services/vehicle.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  angForm: FormGroup;
  vehicle: any = {};
  preview;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      registrationNumber: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      fuelType: ['', Validators.required],
      distance: ['', Validators.required],
      price: ['', Validators.required],
      productImage: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vehicleService.editVehicle(params['id']).subscribe(res => {
        this.vehicle = res;
      });
    });
  }

  addFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.angForm.patchValue({
      productImage: file
    });
    this.angForm.get('productImage').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateVehicle(registrationNumber, brand, model, numberOfSeats, fuelType, distance, price,) {
    this.route.params.subscribe(params => {
      const formData = new FormData();
      Object.keys(this.angForm.value).forEach(element => {
        console.log(this.angForm.value[element] + '->' + element);
        formData.append(element, this.angForm.value[element]);
      });
      this.vehicleService.updateVehicle(formData, params['id']);
      this.router.navigate(['/vehicle-list?updated=true']);
    });

  }
}
