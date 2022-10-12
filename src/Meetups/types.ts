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