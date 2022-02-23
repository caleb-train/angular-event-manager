import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventlistComponent } from 'src/app/components/eventlist/eventlist.component';
import { EventService } from 'src/app/event.service';
import { INewEvt } from 'src/app/models.interface';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent {
  @ViewChild(EventlistComponent, { static: true })
  child!: EventlistComponent;

  originalEventData: INewEvt = {
    name: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
  }

  eventData: INewEvt = { ...this.originalEventData };
  isList = true
  openModal = false
  searchQuery = ''
  errorMsg: any
  loading: boolean = false;

  constructor(private eventService: EventService) {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const sub = this.eventService.createEvent({ ...this.eventData, start_date: new Date(this.eventData.start_date).toISOString(), end_date: new Date(this.eventData.end_date).toISOString() }).subscribe({
      next: auth => {
        this.loading = false
        this.errorMsg = null
        this.openModal = false
        this.child.getEvents('')
      },
      error: err => {
        console.log('error', err?.error)
        this.errorMsg = err?.error?.error ?? err?.error?.message
        this.loading = false
      },
    });
  }
}
