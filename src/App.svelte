<script>
	import Header from './UI/Header.svelte';
	import Button from './UI/Button.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';

	let addNewMeetup = false;

	let meetups = [
		{
			id: 'm1',
			title: 'Coding Bootcamp',
			subtitle: 'Learn to code in 2 hours',
			description: 'In this meetup, we will have some experts that teach you how to code!',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
			address: '27th Nerd Road, 32523 New York',
			contactEmail: 'code@test.com',
			isFavorite: false,
		},
		{
			id: 'm2',
			title: 'Swim Together',
			subtitle: "Let's go for some swimming",
			description: 'We will simply swim some rounds!',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
			address: '27th Nerd Road, 32523 New York',
			contactEmail: 'swim@test.com',
			isFavorite: false,
		},
	];

	function addMeetup(meetup) {
		if (meetup.detail) {
			const newMeetup = {
				id: Math.random().toString(),
				title: meetup.detail.title,
				subtitle: meetup.detail.subtitle,
				description: meetup.detail.description,
				imageUrl: meetup.detail.imageUrl,
				contactEmail: meetup.detail.email,
				address: meetup.detail.address,
			};

			// meetups.push(newMeetup); // DOES NOT WORK!
			meetups = [newMeetup, ...meetups];
			addNewMeetup = false;
		}
	}

	function updateFavorite(id) {
		const index = meetups.findIndex((element) => element.id === id?.detail);
		if (index !== -1) {
			const meetupToUpdate = { ...meetups[index] };
			meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;

			const updatedMeetups = [...meetups];
			updatedMeetups[index] = meetupToUpdate;
			meetups = updatedMeetups;
		}
	}

	function deleteMeetup(id) {
		meetups = meetups.filter((element) => element.id !== id?.detail);
	}

	function reset() {
		addNewMeetup = false;
	}
</script>

<Header />

<main>
	<section class="meetup-control">
		<Button on:click={() => (addNewMeetup = true)}><span>New Meetup</span></Button>
		{#if addNewMeetup}
			<EditMeetup on:save={addMeetup} on:reset={reset} on:cancel={reset} />
		{/if}
	</section>
	<MeetupGrid {meetups} on:togglefavorite={updateFavorite} on:delete={deleteMeetup} />
</main>

<style>
	main {
		margin-top: 5rem;
	}

	.meetup-control {
		margin-left: 1rem;
	}
</style>
