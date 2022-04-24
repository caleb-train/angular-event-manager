import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/event.service';
import {
  IEvt,
  IEvtSpeaker,
  IEvtType,
  INewEvt,
  IRegisterEvt,
} from 'src/app/models.interface';

@Component({
  selector: 'app-admin-event-detail',
  templateUrl: './admin-event-detail.component.html',
  styleUrls: ['./admin-event-detail.component.scss'],
})
export class AdminEventDetailComponent implements OnInit {
  sub: Subscription | undefined;
  event: IEvt | undefined;
  errorMsg: any;
  private openModal = '';
  loading = false;
  eventId: number = 0;

  originalEvtFormData: INewEvt = {
    name: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
  };

  evtFormData: INewEvt = { ...this.originalEvtFormData };

  originalSpeakerFormData: IEvtSpeaker = {
    name: '',
    desc: '',
  };

  speakerFormData: IEvtSpeaker = { ...this.originalSpeakerFormData };

  originalEvtTypeFormData: IEvtType = {
    name: '',
  };

  evtTypeFormData: IEvtType = { ...this.originalEvtTypeFormData };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEvent(+id);
      this.eventId = +id;
    }
  }

  getEvent(id: number) {
    this.sub = this.eventService.getEvent(id).subscribe({
      next: (event) => {
        const { data } = event;
        this.evtFormData = {
          ...data,
          start_date: new Date(data.start_date).toISOString().split('T')[0],
          end_date: new Date(data.end_date).toISOString().split('T')[0],
        };
        this.event = data;
      },
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

  toggleModal(state: 'edit-event' | 'edit-event-type' | 'edit-speaker' | '') {
    this.errorMsg = '';
    this.openModal = state;
  }

  isModalOpen() {
    return this.openModal;
  }

  editEventContent(form: NgForm) {
    if (!form.valid) return;
    this.loading = true;
    console.log(this.evtFormData);
    const sub = this.eventService
      .editEvent(
        {
          name: this.evtFormData.name,
          location: this.evtFormData.location,
          start_date: this.evtFormData.start_date,
          end_date: this.evtFormData.end_date,
          description: this.evtFormData.description,
        },
        this.eventId
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.errorMsg = null;
          this.openModal = '';
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.error ?? err?.error?.message;
        },
      });
  }
}
