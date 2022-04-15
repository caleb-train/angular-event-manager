import { createAction, props } from '@ngrx/store';
import { IEvt } from 'src/app/models.interface';

export interface EventGetActionPayload {
  events: IEvt[];
}

export const EventGetAction = createAction(
  'GET Events',
  props<EventGetActionPayload>()
);
