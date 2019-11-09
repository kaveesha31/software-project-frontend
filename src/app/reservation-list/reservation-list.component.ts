import { Component, OnInit } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations : Reservation[];

  constructor(
    private ReservationService: ReservationService
  ) { }

  ngOnInit() {
    this.ReservationService.displayReservation().subscribe((data: Reservation[]) => {
      this.reservations = data;
    });
  }

  deleteReservation(id) {
    this.ReservationService.deleteReservation(id).subscribe(res => {
      const index = this.reservations.findIndex(x => x['id'] === id);
      this.reservations.splice(index,1);
      console.log('Deleted');
    });
  }


}
