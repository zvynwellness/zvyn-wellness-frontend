import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PricingPlan, PurposeContent, WellnessApiService, WellnessService } from '../../services/wellness-api.service';

@Component({
  selector: 'app-site-page',
  templateUrl: './site-page.component.html',
  styleUrls: ['./site-page.component.css']
})
export class SitePageComponent implements OnInit {
  page = 'about';
  services: WellnessService[] = [];
  pricing: PricingPlan[] = [];
  purpose: PurposeContent = {
    brandPhilosophy: 'Wellness is not a destination. It is your rhythm—personal, evolving, and uniquely yours.',
    personalApproach: 'Listening to how your mind, body, energy, and everyday life work together helps you build a rhythm that supports greater balance, clarity, and effectiveness.',
    coreValues: 'Awareness, consistency, and balance—guided by a rhythm centered around you'
  };

  constructor(private route: ActivatedRoute, private api: WellnessApiService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.page = data['page'];
      if (this.page === 'purpose') { this.api.getPurpose().subscribe({ next: value => { if (value) { this.purpose = value; } } }); }
      if (this.page === 'services' || this.page === 'locations') { this.api.getServices().subscribe({ next: value => this.services = value }); }
      if (this.page === 'pricing') { this.api.getPricing().subscribe({ next: value => this.pricing = value }); }
    });
  }
}
