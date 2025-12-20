import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HmyserviceListComponent } from './components/hmyservice-list/hmyservice-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HmyserviceListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
