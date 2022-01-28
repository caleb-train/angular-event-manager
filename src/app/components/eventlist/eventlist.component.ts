import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  sub!: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['searchQuery']?.currentValue){
      this.events = undefined
      this.getEvents(this.searchQuery)
    } else this.getEvents()
  }

  ngOnInit(): void {
    this.getEvents()
  }

  getEvents(q: string = '') {
    this.sub = this.eventService.getEvents(q).subscribe({
      next: events => this.events = events.data,
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
  viewDetail(id: any) {
    window.location.href = `/event/${id}`;
  }

}
