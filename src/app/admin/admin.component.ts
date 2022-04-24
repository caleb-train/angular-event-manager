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
    console.log(this.activeRoute);
  }

  logout(): void {
    this.eventService.logout();
  }
}
