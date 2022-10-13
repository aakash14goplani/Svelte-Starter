<script lang="ts">
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';
	import MeetupDetails from './Meetups/MeetupDetails.svelte';
	import { meetupsReducer } from './Meetups/meetups-store';
  import { ENP_POINT, type IMeetups } from './types/types';
  import { fetchData } from './helpers/api';
	import LoadingSpinner from './UI/LoadingSpinner.svelte';

	let addNewMeetup = false;
	let pageMode: 'overview' | 'details' = 'overview';
	let meetupId = '';
	let editMeetupId = '';
	let isLoading: boolean = true;

	fetchData({
		url: ENP_POINT,
		method: 'GET'
	}).then((data: any) => {
		const meetups = [];
		if (Object.keys(data).length > 0) {
			for (const key of Object.keys(data)) {
				meetups.push({ id: key, ...data[key] })
			}
		}
		meetupsReducer.setMeetups(meetups);
		isLoading = false;
	});

	meetupsReducer.getLandingPageMode((entry) => {
		pageMode= entry.mode;
		meetupId = entry.id;
	});

	function addMeetup(meetup: any) {
		if (meetup.detail) {
			meetupsReducer.addMeetup(meetup.detail as IMeetups); // <- now redundant as handled by edit meetup comp.

			/* -> EXPORT LOGIC TO STORE <-
				const newMeetup = {
				id: Math.random().toString(),
				title: meetup.detail.title,
				subtitle: meetup.detail.subtitle,
				description: meetup.detail.description,
				imageUrl: meetup.detail.imageUrl,
				contactEmail: meetup.detail.contactEmail,
				address: meetup.detail.address,
			};

			// meetups.push(newMeetup); // DOES NOT WORK!
			meetupArray = [newMeetup, ...meetupArray]; */
		}
		addNewMeetup = false;
	}

	function updateFavorite(id: any) {
		meetupsReducer.updateFavorite(id?.detail as string); // <- now redundant as handled by meetup-item comp.
		/* const index = meetupArray.findIndex((element) => element.id === id?.detail);
		if (index !== -1) {
			const meetupToUpdate = { ...meetupArray[index] };
			meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;

			const updatedMeetups = [...meetupArray];
			updatedMeetups[index] = meetupToUpdate;
			meetupArray = updatedMeetups;
		} */
	}

	function deleteMeetup(id: any) {
		meetupsReducer.deleteMeetup(id?.detail as string); // <- now redundant as handled by meetup-item comp.
		// meetupArray = meetupArray.filter((element) => element.id !== id?.detail);
	}

	function reset() {
		addNewMeetup = false;
		editMeetupId = '';
		pageMode = 'overview';
	}

	function editMeetup(id: any) {
		editMeetupId = id.detail as string ;
		addNewMeetup = true;
	}
</script>

<Header />

<main>
	{#if pageMode === 'overview'}
		<section class="meetup-control">
			{#if addNewMeetup}
				<EditMeetup id={editMeetupId.trim()} on:save={addMeetup} on:reset={reset} on:cancel={reset} />
			{/if}
		</section>
		{#if isLoading}
			<LoadingSpinner />
		{:else}
			<MeetupGrid
				meetups={$meetupsReducer}
				on:togglefavorite={updateFavorite}
				on:delete={deleteMeetup}
				on:edit={editMeetup}
				on:add={(event) => addNewMeetup = event.detail}
			/>
		{/if}
	{:else}
		<MeetupDetails id={meetupId} />
	{/if}
</main>

<style>
	main {
		margin-top: 5rem;
		display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
		padding: 1rem;
	}
</style>
