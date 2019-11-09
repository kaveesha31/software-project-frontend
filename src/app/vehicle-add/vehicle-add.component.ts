import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from '../_services';
import { environment } from '../../environments/environment';
import { VehicleService } from '../_services/vehicle.service';

@Component({ templateUrl: 'vehicle-add.component.html' })
export class VehicleAddComponent implements OnInit {
  vehicleAddForm: FormGroup;
  loading = false;
  submitted = false;
  preview;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private VehicleService: VehicleService,
    private alertService: AlertService,
    private http: HttpClientModule
  ) { }

  ngOnInit() {
    this.vehicleAddForm = this.formBuilder.group({
      registrationNumber: ['s', Validators.required],
      brand: ['s', Validators.required],
      model: ['s', Validators.required],
      numberOfSeats: ['d', Validators.required],
      fuelType: ['rg', Validators.required],
      distance: ['tt', Validators.required],
      price: ['12', Validators.required],
      productImage: [null, Validators.required],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.vehicleAddForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vehicleAddForm.invalid) {
        return;
    }

    this.loading = true;

    const formData = new FormData();
    Object.keys(this.vehicleAddForm.value).forEach(element => {
      console.log(this.vehicleAddForm.value[element] + '->' + element);
      formData.append(element, this.vehicleAddForm.value[element]);
    });

    this.VehicleService.addVehicle(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Vehicle added successful', true);
          this.router.navigate(['/vehicle-list']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  addFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.vehicleAddForm.patchValue({
      productImage: file
    });
    this.vehicleAddForm.get('productImage').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // selectImage(event){
  //     console.log(event.target.files)
  //     if(event.target.files.length > 0){
  //         const frontImage = event.target.files[0];
  //         this.vehicleAddForm.get('frontImage').setValue(frontImage);
  //     }
  // }

  // onLoad(){
  //     const formData = new FormData();
  //     formData.append('frontImage', this.vehicleAddForm.get('frontImage').value);
  // }


}
