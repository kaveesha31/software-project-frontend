import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AlertService, UserService, AuthenticationService} from '../_services';
import {environment} from '../../environments/environment';
import {ReservationService} from '../_services/reservation.service';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent implements OnInit {
  ReservationForm: FormGroup;
  loading = false;
  submitted = false;
  vehicleId;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private reservationService: ReservationService,
    private alertService: AlertService,
    private http: HttpClientModule,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.vehicleId = val.id;
    });
    this.ReservationForm = this.formBuilder.group({
      reservedBy: [this.authenticationService.getCurrentUserId()],
      completed: [false],
      from: ['', Validators.required],
      to: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.ReservationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ReservationForm.invalid) {
      return;
    }

    this.loading = true;
    this.reservationService.addReservation(this.vehicleId, this.ReservationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Reservation added successful', true);
          this.router.navigate(['/reservation-list']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
