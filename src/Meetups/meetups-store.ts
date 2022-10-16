import { writable } from 'svelte/store';

const meetups = [
	{
		id: 'm1',
		title: 'Coding Bootcamp',
		subtitle: 'Learn to code in 2 hours',
		description:
			'In this meetup, we will have some experts that teach you how to code!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
		address: '27th Nerd Road, 32523 New York',
		contactEmail: 'code@test.com',
		isFavorite: false,
	},
	{
		id: 'm2',
		title: 'Swim Together',
		subtitle: "Let's go for some swimming",
		description: 'We will simply swim some rounds!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
		address: '27th Nerd Road, 32523 New York',
		contactEmail: 'swim@test.com',
		isFavorite: false,
	},
];

const meetupsStore = writable<Array<IMeetups>>([]); // (meetups);

const isApiError = writable<IApiError>({
	errorStatus: false,
	errorMessage: ''
});

const landingPageMode = writable<ILandingPageMode>({
	mode: 'overview',
	id: '',
});

export const meetupsReducer = {
	subscribe: meetupsStore.subscribe,
	setMeetups: (meetups: IMeetups[]) => meetupsStore.set(meetups),
	addMeetup: (meetup: IMeetups) => {
		const newMeetup: IMeetups = {
			id: meetup.id,
			title: meetup.title,
			subtitle: meetup.subtitle,
			description: meetup.description,
			imageUrl: meetup.imageUrl,
			contactEmail: meetup.contactEmail,
			address: meetup.address,
			isFavorite: !!meetup.isFavorite,
		};

		meetupsStore.update((meetup) => [newMeetup, ...meetup]);
	},
	updateMeetup: (id: string, meetup: IMeetups) => {
		meetupsStore.update((entries: IMeetups[]) => {
			const restOfEntries: IMeetups[] = entries.filter(entry => entry.id !== id);

			if (restOfEntries.length < entries.length) {
        return [...restOfEntries, { ...meetup }];
			}

			return entries;
		});
	},
	updateFavorite: (id: string) => {
		meetupsStore.update((items: IMeetups[]) => {
			const index: number = items.findIndex((element) => element.id === id);

			if (index !== -1) {
				const meetupToUpdate: IMeetups = { ...items[index] };
				meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;

				const updatedMeetups: IMeetups[] = [...items];
				updatedMeetups[index] = meetupToUpdate;
				return updatedMeetups;
			}

			return items;
		});
	},
	deleteMeetup: (id: string) => {
		meetupsStore.update((items: IMeetups[]) =>
			items.filter((element) => element.id !== id)
		);
	},
	updateLandingPageMode: (input: ILandingPageMode) => {
		landingPageMode.update((_) => input);
	},
	getLandingPageMode: landingPageMode.subscribe,
	isApiError: isApiError.subscribe,
	setApiErrorTo: (status: IApiError) => isApiError.set(status)
};

interface IMeetups {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	imageUrl: string;
	contactEmail: string;
	isFavorite: boolean;
	address: string;
}

interface ILandingPageMode {
	mode: 'overview' | 'details';
	id: string;
}

interface IApiError {
	errorStatus: boolean;
	errorMessage: string;
}
