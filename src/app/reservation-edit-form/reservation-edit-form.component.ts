import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '../_services';
import { ReservationService } from '../_services/reservation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reservation-edit-form',
  templateUrl: './reservation-edit-form.component.html',
  styleUrls: ['./reservation-edit-form.component.css']
})
export class ReservationEditFormComponent implements OnInit {
  angForm: FormGroup;
  vehicle: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ReservationService: ReservationService,
    private FormBuilder: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
    this.angForm = this.FormBuilder.group({
      reservingDate: ['', Validators.required],
      returningDate: ['', Validators.required],
      destination: ['', Validators.required],
      daysExpected: ['', Validators.required],
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ReservationService.editReservation(params['id']).subscribe(res => {
        this.vehicle = res;
    });
  });
  }

  updateReservation(reservingDate, returningDate, destination, daysExpected) {
    this.route.params.subscribe(params => {
       this.ReservationService.updateReservation(reservingDate, returningDate, destination, daysExpected, params['id']);
       this.router.navigate(['/reservation-list']);
 });

}

}
