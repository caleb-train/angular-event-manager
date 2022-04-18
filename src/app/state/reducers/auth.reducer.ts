import { createReducer, on } from '@ngrx/store';
import { IAuth, IEvt } from 'src/app/models.interface';
import * as AuthActions from '../actions/auth.action';

export interface IAuthState {
  currentUser: IAuth | null;
}

const InitialState: IAuthState = {
  currentUser: null,
};

export const AuthReducer = createReducer(
  InitialState,
  on(
    AuthActions.LoginAction,
    (state, payload: AuthActions.LoginActionPayload) => {
      return {
        ...state,
        currentUser: payload.user,
      };
    }
  ),
  on(AuthActions.LogoutAction, (state) => {
    return {
      ...state,
      currentUser: null,
    };
  })
);
