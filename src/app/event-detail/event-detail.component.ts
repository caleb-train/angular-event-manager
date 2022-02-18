import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { IEvt } from '../models.interface';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  sub: Subscription | undefined;
  event: IEvt | undefined;
  errorMsg: any;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) this.getProduct(+id)
  }

  getProduct(id: number) {
    this.sub = this.eventService.getEvent(id).subscribe({
      next: event => this.event = event.data,
      error: err => this.errorMsg = err
    })
    console.log(this.event)
  }

  getEventTypes() {
    return this.event?.event_types?.map((val) => val.name).join(" | ")
  }

  getSpeakers() {
    return this.event?.speakers?.map(
      (speaker) => {
        console.log(speaker)
        return `
    <div class="speaker">
        <div class="dp" style="background-size: cover; background-image: url(${speaker.pic})"></div>
        <div class="details">
            <h6>${speaker.name}</h6>
            <span>${speaker.desc}</span>
        </div>
    </div>
  `
    })
    .join("")
  }
}
