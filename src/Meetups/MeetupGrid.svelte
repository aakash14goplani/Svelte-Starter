<script lang="ts">
	import MeetupItem from './MeetupItem.svelte';
	import MeetupFilter from './MeetupFilter.svelte';
	import type { IMeetups } from '../types/types';
	import Button from '../UI/Button.svelte'; 
	import { createEventDispatcher } from 'svelte';
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

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
	{#if filteredMeetups.length < 1}
		<p id="no-meetup-text">No meetups found, you can start adding new meetups!</p>
	{:else}
		{#each filteredMeetups as meetup, index (meetup.id)}
			<div transition:scale animate:flip={{duration: 300}}>
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
			</div>
		{/each}
	{/if}
</section>

<style>
	#meetups {
		display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
	}

	#meetup-controls {
		margin: 1rem 0;
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}
</style>
