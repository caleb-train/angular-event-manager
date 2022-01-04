export interface IResp<T> {
	data: T;
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