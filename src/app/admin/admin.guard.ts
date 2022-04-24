import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../event.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private eventService: EventService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkedLoggedIn();
  }

  checkedLoggedIn(): boolean {
    if (this.eventService.currentUser) {
      return true;
    }
    this.router.navigate(['/admin-login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private eventService: EventService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkedLoggedIn();
  }

  checkedLoggedIn(): boolean {
    if (this.eventService.currentUser) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
