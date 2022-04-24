import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, IAuthState } from './auth.reducer';
import { EventReducer, IEvtState } from './event.reducer';

export interface IAppState {
  eventState: IEvtState;
  authState: IAuthState;
}

const reducers: ActionReducerMap<IAppState> = {
  eventState: EventReducer,
  authState: AuthReducer,
};

export default reducers;
