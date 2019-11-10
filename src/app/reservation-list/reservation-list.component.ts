import {Component, OnInit} from '@angular/core';
import {Reservation} from '../_models/reservation';
import {ReservationService} from '../_services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: any[];

  constructor(
    private reservationService: ReservationService
  ) {
  }

  ngOnInit() {
    this.reservationService.displayReservation().subscribe((data: any[]) => {
      this.reservations = data;
      console.log(data);
    });
  }

  deleteReservation(id) {
    this.reservationService.deleteReservation(id).subscribe(res => {
      const index = this.reservations.findIndex(x => x['_id'] === id);
      console.log(index);
      this.reservations.splice(index, 1);
    });
  }


}
