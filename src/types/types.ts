export interface IMeetups {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	imageUrl: string;
	contactEmail: string;
	isFavorite: boolean;
  address: string;
}

export interface ILandingPageMode {
  mode: 'overview' | 'details';
  id: string;
}

export interface IFetchRequest {
	url: string;
	headers: any;
	body: any;
	options: any;
	method: 'GET' | 'POST';
}

export const ENP_POINT: string = 'https://angular-fire-a31ae-default-rtdb.firebaseio.com/meetups.json';