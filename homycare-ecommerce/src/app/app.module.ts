import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { HomeComponent } from './components/home/home.component';
import { WellnessApiService } from './services/wellness-api.service';
import { SitePageComponent } from './components/site-page/site-page.component';
import { AuthService } from './services/auth.service';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationService } from './services/reservation.service';
import { AuthGuard } from './services/auth.guard';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeDashboardService } from './services/employee-dashboard.service';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDashboardService } from './services/admin-dashboard.service';

const routes: Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'purpose', component: SitePageComponent, data: { page: 'purpose' }},
  {path: 'about', redirectTo: '/purpose', pathMatch: 'full'},
  {path: 'services', component: SitePageComponent, data: { page: 'services' }},
  {path: 'pricing', redirectTo: '/services', pathMatch: 'full'},
  {path: 'locations', component: SitePageComponent, data: { page: 'locations' }},
  {path: 'reflections', component: SitePageComponent, data: { page: 'reflections' }},
  {path: 'access', redirectTo: '/locations', pathMatch: 'full'},
  {path: 'contact', component: SitePageComponent, data: { page: 'contact' }},
  {path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard]},
  {path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component : ProductDetailsComponent},
  {path: 'search/:keyword', component : ProductListComponent},
  {path: 'category/:id', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
  // Render the homepage at the bare domain so visitors can use
  // https://zvyn-wellness.com/ without an extra `/home` path.
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', redirectTo : '/', pathMatch: 'full'}];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    HomeComponent,
    SitePageComponent,
    ReservationsComponent,
    EmployeeDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService, WellnessApiService, AuthService, ReservationService, EmployeeDashboardService, AdminDashboardService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
