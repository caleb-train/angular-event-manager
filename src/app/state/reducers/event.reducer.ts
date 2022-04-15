import { createReducer, on } from '@ngrx/store';
import { IEvt } from 'src/app/models.interface';
import * as EventActions from '../actions/event.action';

export interface IEvtState {
  events: IEvt[];
  selectedEvent: IEvt | null;
}

const InitialState: IEvtState = {
  events: [],
  selectedEvent: null,
};

export const EventReducer = createReducer(
  InitialState,
  on(
    EventActions.EventGetAction,
    (state, payload: EventActions.EventGetActionPayload) => {
      return {
        ...state,
        events: payload.events,
      };
    }
  )
);
