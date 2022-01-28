import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { EventregistrationComponent } from './eventregistration/eventregistration.component';
import { EventsComponent } from './events/events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LogoComponent } from './components/logo/logo.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';


@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    EventregistrationComponent,
    EventDetailComponent,
    EventsComponent,
    AdminLoginComponent,
    LogoComponent,
    AdminEventsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'events/:id', component: EventDetailComponent },
      { path: 'events', component: EventregistrationComponent },
      { path: '', component: EventsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
