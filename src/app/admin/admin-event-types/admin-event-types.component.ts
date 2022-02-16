import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-admin-event-types',
  templateUrl: './admin-event-types.component.html',
  styleUrls: ['./admin-event-types.component.scss']
})
export class AdminEventTypesComponent implements OnInit {
  eventTypes: any[] | undefined
  sub!: Subscription;
  errorMsg = ''

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEventTypes()
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  getEventTypes(q: string = '') {
    this.sub = this.eventService.getEventTypes(q).subscribe({
      next: eventTypes => this.eventTypes = eventTypes.data,
      error: err => this.errorMsg = err
    })
  }

}
