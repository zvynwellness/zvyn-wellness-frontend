import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HmyserviceListComponent } from './components/hmyservice-list/hmyservice-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HmyserviceService } from './services/hmyservice.service';

import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'category/:id', component : HmyserviceListComponent},
  {path: 'category', component : HmyserviceListComponent},
  {path: 'hmyservice', component : HmyserviceListComponent},
  {path: '', redirectTo : '/hmyservice', pathMatch: 'full'},
  {path: '**', redirectTo : '/hmyservice', pathMatch: 'full'}];


@NgModule({
  declarations: [
    AppComponent,
    HmyserviceListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [HmyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
