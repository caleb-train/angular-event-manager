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
  isAppDrawerOpen: boolean = false;
  route: string = 'events';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<IAppState>,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.store.select('authState').subscribe((authState) => {
      if (!authState.currentUser) this.router.navigate(['/admin-login']);
    });

    this.events = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        const events = event.url.split('/');
        this.route = events[events.length - 1];
      }
    });
  }

  logout(): void {
    this.eventService.logout();
  }
}
