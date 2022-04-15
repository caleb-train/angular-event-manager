import { ActionReducerMap } from '@ngrx/store';
import { EventReducer, IEvtState } from './event.reducer';

export interface IAppState {
  eventState: IEvtState;
}

const reducers: ActionReducerMap<IAppState> = {
  eventState: EventReducer,
};

export default reducers;
