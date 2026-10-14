import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface EmployeeSession {
  id: number;
  customerName: string;
  serviceName: string;
  preferredDateTime: string;
  status: string;
  notes?: string;
}

export interface EmployeeAssignedService {
  id: number;
  name: string;
  location: string;
  googleMapsUrl?: string;
  scheduledDateTime?: string;
}

export interface EmployeeDashboard {
  employeeName: string;
  jobTitle: string;
  todaySessions: EmployeeSession[];
  upcomingAppointments: EmployeeSession[];
  newReservationRequests: EmployeeSession[];
  cancellations: EmployeeSession[];
  pendingActions: EmployeeSession[];
  notifications: string[];
  activeWorkload: number;
  assignedClients: number;
  assignedServices: EmployeeAssignedService[];
}

@Injectable({ providedIn: 'root' })
export class EmployeeDashboardService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  getDashboard(): Observable<EmployeeDashboard> {
    return this.http.get<EmployeeDashboard>(`${environment.apiBaseUrl}/employee/dashboard`, { headers: this.auth.authorizationHeaders });
  }
  updateServiceLocation(serviceId: number, location: string, googleMapsUrl: string): Observable<EmployeeAssignedService> {
    return this.http.patch<EmployeeAssignedService>(`${environment.apiBaseUrl}/employee/services/${serviceId}/location`, { location, googleMapsUrl }, { headers: this.auth.authorizationHeaders });
  }
}
