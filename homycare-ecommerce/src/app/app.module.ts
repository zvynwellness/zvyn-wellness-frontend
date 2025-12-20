import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HmyserviceListComponent } from './components/hmyservice-list/hmyservice-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HmyserviceService } from './services/hmyservice.service';

@NgModule({
  declarations: [
    AppComponent,
    HmyserviceListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HmyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
