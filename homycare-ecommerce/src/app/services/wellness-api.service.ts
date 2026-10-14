import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface WellnessService {
  id?: number;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  imageUrl?: string;
  location?: string;
  googleMapsUrl?: string;
  displayOrder: number;
  active: boolean;
}

export interface PricingPlan {
  id?: number;
  name: string;
  description: string;
  sessionCount: number;
  priceAmount?: number;
  currency: string;
  displayPrice: string;
  offlinePaymentNotice: string;
  displayOrder: number;
  active: boolean;
}

export interface PurposeContent {
  brandPhilosophy: string;
  personalApproach: string;
  coreValues: string;
}

export interface MonthlyWellnessService {
  id: number; serviceId: number; serviceName: string; description: string;
  durationMinutes: number; serviceMonth: string; instructorName: string;
  customerCapacity: number; employeeCapacity: number; location: string;
  googleMapsUrl?: string; priceAmount?: number; currency: string;
  scheduledDateTime?: string;
}

export interface ContactEnquiry {
  name: string; telephone: string; email: string; preference: string; plan: string; details: string;
}

@Injectable({ providedIn: 'root' })
export class WellnessApiService {
  private readonly api = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getServices(): Observable<WellnessService[]> {
    return this.http.get<any>(`${this.api}/wellness-services/search/findByActiveTrueOrderByDisplayOrderAsc`).pipe(
      map(response => response?._embedded?.wellnessServices ?? [])
    );
  }

  getPricing(): Observable<PricingPlan[]> {
    return this.http.get<any>(`${this.api}/pricing-plans/search/findByActiveTrueOrderByDisplayOrderAsc`).pipe(
      map(response => response?._embedded?.pricingPlans ?? [])
    );
  }

  getPurpose(): Observable<PurposeContent | null> {
    return this.http.get<any>(`${this.api}/purpose-content`).pipe(
      map(response => response?._embedded?.purposeContent?.[0] ?? null)
    );
  }

  getMonthlyServices(): Observable<MonthlyWellnessService[]> {
    return this.http.get<MonthlyWellnessService[]>(`${this.api}/monthly-services`);
  }

  sendContact(enquiry: ContactEnquiry): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.api}/contact`, enquiry);
  }
}
