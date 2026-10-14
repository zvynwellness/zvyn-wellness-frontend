import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface AdminService { id:number; name:string; slug:string; description:string; durationMinutes:number; imageUrl?:string; displayOrder:number; active:boolean; customerCapacity:number; employeeCapacity:number; location:string; googleMapsUrl?:string; priceAmount?:number; currency:string; scheduledDateTime:string; instructorEmployeeId?:number; instructorName?:string; }
export interface AdminEmployee { id:number; name:string; jobTitle:string; specialty:string; }
export interface AdminReservation { id:number; customerName:string; serviceName:string; preferredDateTime:string; status:string; instructorName?:string; }
export interface MonthlyService { id:number; serviceId:number; serviceName:string; employeeId?:number; instructorName?:string; serviceMonth:string; }
export interface AdminDashboard { pendingReservations:AdminReservation[]; services:AdminService[]; employees:AdminEmployee[]; monthlyServices:MonthlyService[]; }

@Injectable({providedIn:'root'})
export class AdminDashboardService {
  private api=`${environment.apiBaseUrl}/admin`;
  constructor(private http:HttpClient, private auth:AuthService){}
  dashboard():Observable<AdminDashboard>{ return this.http.get<AdminDashboard>(`${this.api}/dashboard`,{headers:this.auth.authorizationHeaders}); }
  confirm(id:number,employeeId:number){ return this.http.patch(`${this.api}/reservations/${id}/confirm`,{employeeId},{headers:this.auth.authorizationHeaders}); }
  saveService(service:Partial<AdminService>){ const body={...service,imageUrl:service.imageUrl||null}; return service.id?this.http.put(`${this.api}/services/${service.id}`,body,{headers:this.auth.authorizationHeaders}):this.http.post(`${this.api}/services`,body,{headers:this.auth.authorizationHeaders}); }
  deleteService(id:number){ return this.http.delete(`${this.api}/services/${id}`,{headers:this.auth.authorizationHeaders}); }
  addMonthly(serviceId:number){ return this.http.post(`${this.api}/monthly-services`,{serviceId},{headers:this.auth.authorizationHeaders}); }
  deleteMonthly(id:number){ return this.http.delete(`${this.api}/monthly-services/${id}`,{headers:this.auth.authorizationHeaders}); }
}
