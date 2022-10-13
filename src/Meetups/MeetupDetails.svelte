<script lang="ts">
	import { onDestroy } from 'svelte';
	import { meetupsReducer } from './meetups-store.js';
	import Button from '../UI/Button.svelte';
  import type { IMeetups } from '../types/types.js';

	export let id = '';
	let selectedMeetup: IMeetups | undefined;

	const unsubscribe = meetupsReducer.subscribe((items) => {
		selectedMeetup = items.find((i) => i.id === id);
	});

  function updatePageMode() {
    meetupsReducer.updateLandingPageMode({ mode: 'overview', id });
  }

	onDestroy(() => {
		unsubscribe();
	});
</script>

<section class="meetup-details">
	<div class="image">
		<img src={selectedMeetup?.imageUrl} alt={selectedMeetup?.title} />
	</div>
	<div class="content">
		<h1>{selectedMeetup?.title}</h1>
		<h2>{selectedMeetup?.subtitle} - {selectedMeetup?.address}</h2>
		<p>{selectedMeetup?.description}</p>
		<Button href="mailto:{selectedMeetup?.contactEmail}">Contact</Button>
		<Button type="button" mode="outline" on:click={updatePageMode}>
			Close
		</Button>
	</div>
</section>

<style>
	.meetup-details {
		margin-top: 4rem;
	}

	.image {
		width: 100%;
		height: 25rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image {
		background: #e7e7e7;
	}

	.content {
		text-align: center;
		width: 80%;
		margin: auto;
	}

	h1 {
		font-size: 2rem;
		font-family: 'Roboto Slab', sans-serif;
		margin: 0.5rem 0;
	}

	h2 {
		font-size: 1.25rem;
		color: #6b6b6b;
	}

	p {
		font-size: 1.5rem;
	}
</style>
