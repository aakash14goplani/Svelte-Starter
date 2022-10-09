<script lang="ts">
	import MeetupItem from './MeetupItem.svelte';
	import MeetupFilter from './MeetupFilter.svelte';
	import type { IMeetups } from './types';
	import Button from '../UI/Button.svelte'; 
	import { createEventDispatcher } from 'svelte';

	export let meetups: IMeetups[];

	let favsOnly: boolean = false;
	const dispatch = createEventDispatcher();

	$: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

	function setFilter(event: any) {
		favsOnly = event.detail === 1;
	}
</script>

<section id="meetup-controls">
	<MeetupFilter on:select={setFilter} />
	<Button on:click={() => dispatch('add', true)}>
		<span>New Meetup</span>
	</Button>
</section>
<section id="meetups">
	{#each filteredMeetups as meetup, index (meetup.id)}
		<MeetupItem
			title={meetup.title}
			subtitle={meetup.subtitle}
			description={meetup.description}
			imageUrl={meetup.imageUrl}
			address={meetup.address}
			id={meetup.id}
			isFavorite={meetup.isFavorite}
			on:togglefavorite
			on:delete
			on:edit
		/>
	{/each}
</section>

<style>
	section {
		width: 98%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}

	#meetup-controls {
		margin: 1rem;
		display: flex;
		justify-content: space-around;
	}

	@media (min-width: 768px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
