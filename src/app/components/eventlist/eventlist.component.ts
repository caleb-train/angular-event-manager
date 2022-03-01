import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit, OnChanges {
  @Input() isList = true
  errorMsg = ''
  @Input() searchQuery = ''
  events: any[] | undefined
  isLoggedIn: boolean = false;
  sub!: Subscription;

  constructor(private eventService: EventService, private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['searchQuery']?.currentValue) {
      this.events = undefined
      this.getEvents(this.searchQuery)
    } else this.getEvents()
  }

  ngOnInit(): void {
    this.isLoggedIn = this.router.url === '/admin/events'
    this.getEvents()
  }

  getEvents(q: string = '') {
    this.events = undefined
    this.sub = this.eventService.getEvents(q).subscribe({
      next: events => this.events = events.data,
      error: err => this.errorMsg = err
    })
  }

  deleteEvent(id: number) {
    this.sub = this.eventService.deleteEvent(id).subscribe({
      next: resp => {
        this.getEvents()
      },
      error: err => this.errorMsg = err
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  formatEventTypes(eventTypes: { id: number, name: string }[] | null, isList: boolean = false) {
    if (!eventTypes) return [""]
    let evtTypes = eventTypes.map(val => {
      if ([
        "Leap",
        "Recruiting Mission",
        "Hackathon",
      ].includes(val.name) && isList) return `<span class="special-event-type">${val.name}</span>`
      else return val.name
    })

    return evtTypes.join(' | ')
  }

  isItemSpecial(items: { id: number, name: string }[] | null) {
    if (!items) return false;
    return !items.every(itm => ![
      "Leap",
      "Recruiting Mission",
      "Hackathon",
    ].includes(itm.name))
  }
  viewDetail(event: any, id: number) {
    if (event.target.nodeName == 'BUTTON') {
      console.log(event.target.nodeName);
      this.deleteEvent(id)
    } else window.location.href = `/event/${id}`;
  }
}
