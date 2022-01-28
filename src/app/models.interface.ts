export interface IResp<T> {
	data: T;
	message?: string,
	status: number;
}

export interface IError {
	error: string,
	status: number;
}

export interface IEvt {
	id: number;
	name: string;
	location: string;
	speakers: {
		name: string;
		desc: string;
		pic: string;
	}[];
	description: string;
	start_date: string;
	end_date: string;
	event_types?: {
		id: number;
		name: string;
	}[]
}

export interface ILogin {
	username: string,
	password: string
}

export interface IAuth {
	token: string,
	username: string
}