import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { IEvt, IRegisterEvt } from '../models.interface';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  sub: Subscription | undefined;
  event: IEvt | undefined;
  errorMsg: any;
  openModal = false;
  loading = false;
  eventId: number = 0;

  originalFormData: IRegisterEvt = {
    name: '',
    email: '',
  };

  formData: IRegisterEvt = { ...this.originalFormData };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(+id);
      this.eventId = +id;
    }
  }

  getProduct(id: number) {
    this.sub = this.eventService.getEvent(id).subscribe({
      next: (event) => (this.event = event.data),
      error: (err) => (this.errorMsg = err),
    });
  }

  getEventTypes() {
    return this.event?.event_types?.map((val) => val.name).join(' | ');
  }

  getSpeakers() {
    return this.event?.speakers
      ?.map((speaker) => {
        return `
    <div class="speaker">
        <div class="dp" style="background-size: cover; background-image: url(${speaker.pic})"></div>
        <div class="details">
            <h6>${speaker.name}</h6>
            <span>${speaker.desc}</span>
        </div>
    </div>
  `;
      })
      .join('');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.loading = true;
    const sub = this.eventService
      .registerEvent({
        name: this.formData.name,
        email: this.formData.email,
        event_id: this.eventId,
      })
      .subscribe({
        next: (auth) => {
          this.loading = false;
          this.errorMsg = null;
          this.openModal = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.error ?? err?.error?.message;
        },
      });
  }
}
