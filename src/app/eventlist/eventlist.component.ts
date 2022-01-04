import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { IEvt, IResp } from '../models.interface';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {
  isList = true
  errorMsg = ''
  events:any[] = []
  sub!: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.sub = this.eventService.getEvents().subscribe({
      next: events => this.events = events.data,
      error: err => this.errorMsg = err
    })
    console.log(this.events)
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  formatEventTypes(eventTypes: { id: number, name: string }[] | null, isList: boolean = false) {
    if (!eventTypes) return [""]
    let evtTypes = eventTypes.map(val => {
      if([
        "Leap",
        "Recruiting Mission",
        "Hackathon",
      ].includes(val.name) && isList) return `<span class="special-event-type">${val.name}</span>`
      else return val.name
    })

    return evtTypes.join(' | ')
  }

  isItemSpecial(items: { id: number, name: string }[] | null) {
    if(!items) return false;
    return !items.every(itm => ![
      "Leap",
      "Recruiting Mission",
      "Hackathon",
    ].includes(itm.name))
  }
  viewDetail(id: any) {
    window.location.href = `/event/${id}`;
  }

}
