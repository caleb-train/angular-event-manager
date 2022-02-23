import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  events: any;
  activeRoute: string = '';
  isAppDrawerOpen: boolean = false;

  constructor(private router: Router, private eventService: EventService) {
    this.events = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = this.setRoute(event.url)
      }
    })
  }

  ngOnInit(): void {
    this.activeRoute = this.setRoute(this.router.url)
  }

  logout(): void {
    this.eventService.logout()
    window.location.href = '/admin-login'
  }

  setRoute(url: string): string {
    switch (url) {
      case '/admin/events':
        return 'events'
      case '/admin/event-types':
        return 'event-types'
      case '/admin/registrations':
        return 'registrations'
      default:
        this.router.navigate(['/admin/events'])
        return 'events'
    }
  }

}
