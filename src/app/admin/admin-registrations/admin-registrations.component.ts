import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-admin-registrations',
  templateUrl: './admin-registrations.component.html',
  styleUrls: ['./admin-registrations.component.scss']
})
export class AdminRegistrationsComponent implements OnInit {
  registrations: any[] | undefined
  sub!: Subscription;
  errorMsg = ''

  searchQuery = ''

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getRegistration()
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  OnChanges(newValue: string): void {
    this.searchQuery = newValue
    if (newValue) {
      this.registrations = undefined
      this.getRegistration(newValue)
    } else this.getRegistration()
  }

  getRegistration(q: string = '') {
    this.sub = this.eventService.getRegistrations(q).subscribe({
      next: registrations => this.registrations = registrations.data,
      error: err => this.errorMsg = err
    })
  }

}
