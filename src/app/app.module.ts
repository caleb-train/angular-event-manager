import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { EventregistrationComponent } from './eventregistration/eventregistration.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    EventregistrationComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'events/:id', component: EventDetailComponent},
      {path: 'events', component: EventregistrationComponent},
      {path: '', component: EventlistComponent},
      {path: '**', redirectTo: '', pathMatch: 'full'},
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
