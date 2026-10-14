import { Component, OnInit } from '@angular/core';
import { MonthlyWellnessService, PricingPlan, PurposeContent, WellnessApiService, WellnessService } from '../../services/wellness-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactOpen = false;
  contactError = '';
  contactMessage = '';
  contactSubmitting = false;
  contactPlan = '';
  contact = { name: '', telephone: '', details: '', email: '', preference: 'Email' };
  monthlyServices: MonthlyWellnessService[] = [];
  services: WellnessService[] = [
    { name: 'Private Movement', slug: 'private-movement', description: 'One-to-one movement guidance adapted to your body, ability, goals, and pace.', durationMinutes: 60, displayOrder: 1, active: true },
    { name: 'Restorative Wellness', slug: 'restorative-wellness', description: 'A gentle restorative session centered on rest, recovery, nourishment, and sustainable daily rhythms.', durationMinutes: 60, displayOrder: 2, active: true },
    { name: 'Guided Mindfulness', slug: 'guided-mindfulness', description: 'Personal mindfulness practice that supports calm attention, emotional steadiness, and greater clarity.', durationMinutes: 45, displayOrder: 3, active: true }
  ];

  pricing: PricingPlan[] = [
    { name: 'Individual Session', description: 'A single private wellness session.', sessionCount: 1, currency: 'JPY', displayPrice: 'Contact us', offlinePaymentNotice: 'Payment is arranged offline after your reservation is confirmed.', displayOrder: 1, active: true },
    { name: 'Group - Session', description: 'A shared wellness session designed for connection and consistent support.', sessionCount: 1, currency: 'JPY', displayPrice: 'Contact us', offlinePaymentNotice: 'Payment is arranged offline after your reservation is confirmed.', displayOrder: 2, active: true },
    { name: 'Private Consultation', description: 'A private introductory conversation to understand your needs.', sessionCount: 1, currency: 'JPY', displayPrice: 'Contact us', offlinePaymentNotice: 'No online payment is collected.', displayOrder: 3, active: true }
  ];

  purpose: PurposeContent = {
    brandPhilosophy: 'Wellness is not a destination. It is your rhythm—personal, evolving, and uniquely yours.',
    personalApproach: 'Listening to how your mind, body, energy, and everyday life work together helps you build a rhythm that supports greater balance, clarity, and effectiveness.',
    coreValues: 'Awareness, consistency, and balance—guided by a rhythm centered around you'
  };

  constructor(private wellnessApi: WellnessApiService) { }

  ngOnInit(): void {
    this.wellnessApi.getServices().subscribe({ next: services => { if (services.length) { this.services = services; } } });
    this.wellnessApi.getPricing().subscribe({ next: pricing => { if (pricing.length) { this.pricing = pricing; } } });
    this.wellnessApi.getPurpose().subscribe({ next: purpose => { if (purpose) { this.purpose = purpose; } } });
    this.wellnessApi.getMonthlyServices().subscribe({ next: services => this.monthlyServices = services.slice(0, 3) });
  }

  serviceNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  openContact(plan: string): void {
    this.contactPlan = plan;
    this.contactError = '';
    this.contactMessage = '';
    this.contactOpen = true;
  }

  closeContact(): void { this.contactOpen = false; }

  submitContact(): void {
    const name = this.contact.name.trim();
    const telephone = this.contact.telephone.trim();
    const email = this.contact.email.trim();
    const details = this.contact.details.trim();
    if (!name || !telephone || !email || !details) {
      this.contactError = 'Name, telephone, email address, and consultation details are required.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.contactError = 'Please enter a valid email address.';
      return;
    }
    this.contactSubmitting = true;
    this.wellnessApi.sendContact({name, telephone, email, details, preference: this.contact.preference, plan: this.contactPlan}).subscribe({
      next: response => {
        this.contactSubmitting = false;
        this.contactMessage = response.message || 'Your enquiry was sent successfully.';
        this.contact = {name:'',telephone:'',details:'',email:'',preference:'Email'};
      },
      error: error => {
        this.contactSubmitting = false;
        this.contactError = error.error?.detail || error.error?.message || (error.status === 0
          ? 'The ZVyn server is unavailable. Please try again later.'
          : 'Your enquiry could not be sent. Please try again.');
      }
    });
  }
}
