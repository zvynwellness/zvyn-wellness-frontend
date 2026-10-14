import { Component, OnInit } from '@angular/core';
import { EmployeeAssignedService, EmployeeDashboard, EmployeeDashboardService, EmployeeSession } from '../../services/employee-dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  styles: [`.location-note{margin:18px 0;color:#756b5f;font-size:12px;line-height:1.6}.service-locations form{display:grid;gap:10px;padding:20px 5px;border-bottom:1px solid #ece3d4}.service-locations label{display:grid;gap:6px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#8a7657}.service-locations input{box-sizing:border-box;width:100%;padding:11px;border:1px solid #d8c8aa;background:#fffdf8;color:#29251f}.service-locations a{font-size:11px;color:#9a6d25}.service-locations button{justify-self:start;border:0;background:#a7782e;color:#fff;padding:11px 18px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}.service-locations button:disabled{opacity:.55;cursor:wait}.save-message,.save-error{margin-top:15px;font-size:12px}.save-message{color:#51734d}.save-error{color:#a63b32}`]
})
export class EmployeeDashboardComponent implements OnInit {
  today = new Date();
  dashboard?: EmployeeDashboard;
  error = '';
  locationMessage = '';
  locationError = '';
  savingServiceId?: number;
  constructor(private dashboardApi: EmployeeDashboardService) { }
  ngOnInit(): void {
    this.dashboardApi.getDashboard().subscribe({
      next: dashboard => this.dashboard = dashboard,
      error: () => this.error = 'The employee dashboard could not be loaded. Please confirm you are logged in with an Employee account.'
    });
  }
  trackSession(_: number, session: EmployeeSession): number { return session.id; }
  trackService(_: number, service: EmployeeAssignedService): number { return service.id; }
  saveLocation(service: EmployeeAssignedService): void {
    this.locationMessage = '';
    this.locationError = '';
    const location = service.location?.trim();
    const googleMapsUrl = service.googleMapsUrl?.trim() || '';
    if (!location) { this.locationError = 'Location is required.'; return; }
    if (googleMapsUrl && !googleMapsUrl.startsWith('https://')) { this.locationError = 'Google Maps link must start with https://.'; return; }
    this.savingServiceId = service.id;
    this.dashboardApi.updateServiceLocation(service.id, location, googleMapsUrl).subscribe({
      next: saved => { Object.assign(service, saved); this.savingServiceId = undefined; this.locationMessage = `${saved.name} location changes saved.`; },
      error: err => { this.savingServiceId = undefined; this.locationError = err?.error?.message || 'Unable to save this service location.'; }
    });
  }
}
