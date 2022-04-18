import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminEventTypesComponent } from './admin/admin-event-types/admin-event-types.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard, PublicGuard } from './admin/admin.guard';
import { AppComponent } from './app.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { LogoComponent } from './components/logo/logo.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { AdminRegistrationsComponent } from './admin/admin-registrations/admin-registrations.component';
import { StoreModule } from '@ngrx/store';
import reducers from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    EventDetailComponent,
    EventsComponent,
    AdminLoginComponent,
    LogoComponent,
    AdminEventsComponent,
    AdminComponent,
    AdminEventTypesComponent,
    AdminRegistrationsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            redirectTo: 'events',
            pathMatch: 'full',
          },
          {
            path: 'events',
            component: AdminEventsComponent,
          },
          {
            path: 'event-types',
            component: AdminEventTypesComponent,
          },
          {
            path: 'registrations',
            component: AdminRegistrationsComponent,
          },
        ],
      },
      {
        path: 'admin-login',
        component: AdminLoginComponent,
        canActivate: [PublicGuard],
      },
      { path: 'events/:id', component: EventDetailComponent },
      { path: 'events', component: EventsComponent },
      { path: '', component: EventsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
