import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event.service';
import { IEvtTypes } from 'src/app/models.interface';

@Component({
  selector: 'app-admin-event-types',
  templateUrl: './admin-event-types.component.html',
  styleUrls: ['./admin-event-types.component.scss']
})
export class AdminEventTypesComponent implements OnInit {
  eventTypes: any[] | undefined
  sub!: Subscription;
  loading = false
  errorMsg: any
  openModal = false

  originalEventData: IEvtTypes = {
    name: '',
  }

  eventTypeData: IEvtTypes = { ...this.originalEventData };

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

  deleteEventType(id: number) {
    this.sub = this.eventService.deleteEventType(id).subscribe({
      next: resp => {
        this.getEventTypes()
      },
      error: err => this.errorMsg = err
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.errors, form)
    if (!form.valid) return
    this.loading = true;
    const sub = this.eventService.createEventType(this.eventTypeData).subscribe({
      next: auth => {
        this.loading = false
        this.errorMsg = null
        this.openModal = false
        this.getEventTypes()
      },
      error: err => {
        this.loading = false
        console.log('error', err?.error)
        this.errorMsg = err?.error?.error ?? err?.error?.message
      },
    });
  }

}
