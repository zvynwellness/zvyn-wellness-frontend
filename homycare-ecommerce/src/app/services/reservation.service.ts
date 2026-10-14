import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface Reservation {
  id: number;
  serviceId: number;
  serviceName: string;
  preferredDateTime: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  instructorName?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly api = `${environment.apiBaseUrl}/reservations`;
  constructor(private http: HttpClient, private auth: AuthService) { }

  mine(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.api}/mine`, { headers: this.auth.authorizationHeaders });
  }

  create(serviceId: number, preferredDateTime: string, notes: string): Observable<Reservation> {
    return this.http.post<Reservation>(this.api, { serviceId, preferredDateTime, notes }, { headers: this.auth.authorizationHeaders });
  }

  cancel(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.api}/${id}/cancel`, {}, { headers: this.auth.authorizationHeaders });
  }
}
