import { createAction, props } from '@ngrx/store';
import { IAuth } from 'src/app/models.interface';

export interface LoginActionPayload {
  user: IAuth | null;
}

export const LoginAction = createAction(
  'Login Action',
  props<LoginActionPayload>()
);

export const LogoutAction = createAction('Logout Action');
