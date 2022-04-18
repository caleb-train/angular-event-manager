import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventService } from '../event.service';
import { IAppState } from '../state/reducers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  events: any;
  activeRoute: string = '';
  isAppDrawerOpen: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IAppState>,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.store.select('authState').subscribe((authState) => {
      if (!authState.currentUser) window.location.href = '/admin-login';
    });
    this.events = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = this.setRoute(event.url);
      }
    });
    this.activeRoute = this.setRoute(this.router.url);
  }

  logout(): void {
    this.eventService.logout();
  }

  setRoute(url: string): string {
    switch (url) {
      case '/admin/events':
        return 'events';
      case '/admin/event-types':
        return 'event-types';
      case '/admin/registrations':
        return 'registrations';
      default:
        this.router.navigate(['/admin/events']);
        return 'events';
    }
  }
}
