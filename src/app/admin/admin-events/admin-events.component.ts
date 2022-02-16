import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INewEvt } from 'src/app/models.interface';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent {

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

  constructor() {
  }

  onSubmit(form: NgForm) {

  }
}
