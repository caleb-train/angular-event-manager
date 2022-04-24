export interface IResp<T> {
  data: T;
  message?: string;
  status: number;
}

export interface IError {
  error: string;
  status: number;
}

export interface IEvt {
  id: number;
  name: string;
  location: string;
  speakers: IEvtSpeaker[];
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  event_types?: IEvtType[];
}

export interface IEvtSpeaker {
  name: string;
  desc: string;
  pic?: string;
}
export interface IEvtType {
  id?: number;
  name: string;
}

export interface IRegisterEvt {
  name: string;
  email: string;
  event_id?: number;
}

export interface IEvtTypes {
  id?: number;
  name: string;
  created_at?: string;
  admin_id?: string;
}

export interface INewEvt {
  name: string;
  location: string;
  start_date: string | Date;
  end_date: string | Date;
  description: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAuth {
  token: string;
  username: string;
}
