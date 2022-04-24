import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAuth, IEvt } from 'src/app/models.interface';
import * as EventActions from 'src/app/state/actions/event.action';
import { IAppState } from 'src/app/state/reducers';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss'],
})
export class EventlistComponent implements OnInit, OnChanges {
  @Input() isList = true;
  errorMsg = '';
  @Input() searchQuery = '';
  events: any[] | undefined;
  currentUser: IAuth | null = null;
  sub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private store: Store<IAppState>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['searchQuery']?.currentValue) {
      this.events = undefined;
      this.getEvents(this.searchQuery);
    } else if (changes?.['searchQuery']?.previousValue) this.getEvents();
  }

  ngOnInit(): void {
    this.store.select('authState').subscribe((auth) => {
      this.currentUser = auth.currentUser;
    });
    this.getEvents();
    this.store.select('eventState').subscribe((evtState) => {
      this.events = evtState.events;
    });
  }

  getEvents(q: string = '') {
    this.events = undefined;
    this.sub = this.eventService.getEvents(q).subscribe({
      next: (events) => {
        this.store.dispatch(
          EventActions.EventGetAction({ events: events.data })
        );
      },
      error: (err) => (this.errorMsg = err),
    });
  }

  deleteEvent(id: number) {
    this.sub = this.eventService.deleteEvent(id).subscribe({
      next: (resp) => {
        this.getEvents();
      },
      error: (err) => (this.errorMsg = err),
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  formatEventTypes(
    eventTypes: { id: number; name: string }[] | null,
    isList: boolean = false
  ) {
    if (!eventTypes) return [''];
    let evtTypes = eventTypes.map((val) => {
      if (
        ['Leap', 'Recruiting Mission', 'Hackathon'].includes(val.name) &&
        isList
      )
        return `<span class="special-event-type">${val.name}</span>`;
      else return val.name;
    });

    return evtTypes.join(' | ');
  }

  isItemSpecial(items: { id: number; name: string }[] | null) {
    if (!items) return false;
    return !items.every(
      (itm) => !['Leap', 'Recruiting Mission', 'Hackathon'].includes(itm.name)
    );
  }
  viewDetail(event: any, id: number) {
    if (event.target.nodeName == 'BUTTON') {
      console.log(event.target.nodeName);
      this.deleteEvent(id);
    } else {
      if (this.currentUser == null) {
        this.router.navigate([`/events`, id]);
      } else {
        console.log('asddd');
        this.router.navigate([`/admin/events`, id]);
      }
    }
  }
}
