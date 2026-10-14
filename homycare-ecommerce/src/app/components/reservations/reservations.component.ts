import { Component, OnInit } from '@angular/core';
import { WellnessApiService, WellnessService } from '../../services/wellness-api.service';
import { Reservation, ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  services: WellnessService[] = [];
  reservations: Reservation[] = [];
  serviceId?: number;
  preferredDateTime = '';
  notes = '';
  message = '';
  error = '';

  constructor(private wellnessApi: WellnessApiService, private reservationApi: ReservationService) { }

  ngOnInit(): void {
    this.wellnessApi.getServices().subscribe({ next: services => this.services = services });
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationApi.mine().subscribe({
      next: reservations => this.reservations = reservations,
      error: () => this.error = 'We could not load your reservations. Please log in again.'
    });
  }

  reserve(): void {
    if (!this.serviceId || !this.preferredDateTime) { return; }
    this.error = '';
    this.message = '';
    this.reservationApi.create(this.serviceId, this.preferredDateTime, this.notes).subscribe({
      next: () => {
        this.message = 'Your reservation request has been received.';
        this.preferredDateTime = '';
        this.notes = '';
        this.loadReservations();
      },
      error: error => this.error = error.status === 409
        ? 'Employees may reserve a maximum of five sessions per month.'
        : 'We could not create this reservation. Please choose a future date and try again.'
    });
  }

  canCancel(reservation: Reservation): boolean {
    return reservation.status !== 'CANCELLED' && new Date(reservation.preferredDateTime).getTime() - Date.now() >= 24 * 60 * 60 * 1000;
  }

  cancel(reservation: Reservation): void {
    this.error = '';
    this.reservationApi.cancel(reservation.id).subscribe({
      next: () => { this.message = 'Your reservation has been cancelled.'; this.loadReservations(); },
      error: error => this.error = error.status === 409
        ? 'This appointment is less than 24 hours away. Please contact customer service to cancel.'
        : 'We could not cancel this reservation.'
    });
  }
}
