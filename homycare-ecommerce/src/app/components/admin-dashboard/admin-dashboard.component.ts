import { Component, OnInit } from '@angular/core';
import { AdminDashboard, AdminDashboardService, AdminService } from '../../services/admin-dashboard.service';

@Component({selector:'app-admin-dashboard',templateUrl:'./admin-dashboard.component.html',styleUrls:['./admin-dashboard.component.css']})
export class AdminDashboardComponent implements OnInit {
  dashboard?:AdminDashboard; error=''; message=''; assignments:Record<number,number>={};
  service:Partial<AdminService>={name:'',slug:'',description:'',category:'MOVE',durationMinutes:60,displayOrder:0,active:true,customerCapacity:10,employeeCapacity:5,location:'To be confirmed',currency:'JPY'};
  monthServiceId?:number;
  constructor(private api:AdminDashboardService){}
  ngOnInit(){this.load();}
  load(){this.api.dashboard().subscribe({next:value=>this.dashboard=value,error:()=>this.error='Admin dashboard could not be loaded.'});}
  confirm(id:number){const employeeId=this.assignments[id];if(!employeeId)return;this.api.confirm(id,employeeId).subscribe({next:()=>{this.message='Reservation confirmed and instructor assigned.';this.load();},error:()=>this.error='Unable to confirm the reservation.'});}
  edit(value:AdminService){this.service={...value,category:value.category||'MOVE'};}
  reset(){this.service={name:'',slug:'',description:'',category:'MOVE',durationMinutes:60,displayOrder:0,active:true,customerCapacity:10,employeeCapacity:5,location:'To be confirmed',currency:'JPY'};}
  save(){
    this.error=''; this.message='';
    const name=this.service.name?.trim()||'';
    const description=this.service.description?.trim()||'';
    const location=this.service.location?.trim()||'';
    const currency=(this.service.currency?.trim()||'').toUpperCase();
    if(!name){this.error='Service name is required.';return;}
    if(!description){this.error='Service description is required.';return;}
    if((this.service.durationMinutes??0)<15){this.error='Duration must be at least 15 minutes.';return;}
    if((this.service.customerCapacity??-1)<0){this.error='Customer slots must be zero or more.';return;}
    if((this.service.employeeCapacity??-1)<0){this.error='Employee slots must be zero or more.';return;}
    if(!location){this.error='Service location is required.';return;}
    if(this.service.googleMapsUrl&&!this.service.googleMapsUrl.startsWith('https://')){this.error='Google Maps link must start with https://.';return;}
    if(!this.service.scheduledDateTime){this.error='Service date and time are required.';return;}
    if(this.service.priceAmount!=null&&this.service.priceAmount<0){this.error='Price must be zero or more.';return;}
    if(!/^[A-Z]{3}$/.test(currency)){this.error='Currency must be a three-letter code, for example JPY or USD.';return;}
    const slug=(this.service.slug?.trim()||this.slugify(name));
    if(!slug){this.error='A unique service slug is required.';return;}
    this.service={...this.service,name,description,location,currency,slug};
    this.api.saveService(this.service).subscribe({next:()=>{this.message='Changes saved.';this.reset();this.load();},error:error=>{
      if(error.status===0){this.error='The ZVyn server is unavailable. Restart the backend on port 8080.';return;}
      if(error.status===401||error.status===403){this.error='Your Admin session is no longer authorized. Please log in again.';return;}
      if(error.status===409){this.error=error.error?.message||`The slug “${slug}” is already used by another service.`;return;}
      const fieldErrors=error.error?.fieldErrors;
      if(fieldErrors){this.error=Object.values(fieldErrors).join(' ');return;}
      this.error=error.error?.message||`The service could not be saved (server response ${error.status||'unknown'}).`;
    }});
  }
  private slugify(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  remove(id:number,name:string){if(!window.confirm(`Delete “${name}”? This will also remove it from the homepage.`))return;this.error='';this.api.deleteService(id).subscribe({next:()=>{this.message='Service deleted.';this.load();},error:error=>this.error=error.error?.message||'The service could not be deleted.'});}
  addMonthly(){if(!this.monthServiceId){this.error='Choose a service to display on the homepage.';return;}this.api.addMonthly(this.monthServiceId).subscribe({next:()=>{this.message='Service added to the homepage.';this.load();},error:error=>this.error=error.error?.detail||error.error?.message||'Only three unique services can be displayed on the homepage.'});}
  removeMonthly(id:number,name:string){if(!window.confirm(`Remove “${name}” from the homepage?`))return;this.api.deleteMonthly(id).subscribe({next:()=>{this.message='Service removed from the homepage.';this.load();},error:()=>this.error='Unable to remove the service from the homepage.'});}
}
