<script>
	import Button from '../UI/Button.svelte';
	import Badge from '../UI/Badge.svelte';
	import { createEventDispatcher } from 'svelte';
	import { meetupsReducer } from './meetups-store';

	export let title;
	export let subtitle;
	export let imageUrl;
	export let description;
	export let address;
	export let id;
	export let isFavorite;

	const dispatch = createEventDispatcher();

	function updateFavorite() {
		meetupsReducer.updateFavorite(id);
	}

	function deleteMeetup() {
		meetupsReducer.deleteMeetup(id);
	}

	function updatePageMode() {
		meetupsReducer.updateLandingPageMode({ mode: 'details', id });
	}
</script>

<article class="{'meetup-item-' + id}">
	<header>
		<div class="details">
			<h1>
				{title}
				{#if isFavorite}
					<Badge>FAVORITE</Badge>
				{/if}
			</h1>
			<h2>{subtitle}</h2>
			<p>{address}</p>
		</div>
		<div class="close">
			<Button type="button" on:click="{() => dispatch('delete', id)}" disable="{false}"><span>X</span></Button>
		</div>
	</header>
	<div class="image">
		<img src="{imageUrl}" alt="{title}" />
	</div>
	<div class="content">
		<p>{description}</p>
	</div>
	<footer>
		<Button type="button" on:click={() => dispatch('edit', id)}>
			<span>Edit</span>
		</Button>
		<!-- <Button
			mode="outline"
			color={isFavorite ? '' : 'success'}
			type="button"
			on:click={() => dispatch('togglefavorite', id)}
		> -->
		<Button
			mode="outline"
			color={isFavorite ? '' : 'success'}
			type="button"
			on:click={updateFavorite}
		>
			<span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span>
		</Button>
		<Button type="button" on:click={updatePageMode}>
			<span>Show Details</span>
		</Button>
	</footer>
</article>

<style>
	article {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
		margin: 1rem;
	}

	header,
	.content,
	footer {
		padding: 1rem;
	}

	header,
	footer {
		display: flex;
		justify-content: space-between;
	}

	.details {
		text-align: left;
	}

	.image {
		width: 100%;
		height: 14rem;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h1 {
		font-size: 1rem;
		margin: 0.5rem 0;
		font-family: 'Roboto Slab', sans-serif;
	}

	h2 {
		font-size: 1rem;
		color: #808080;
		margin: 0.5rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}

	div {
		text-align: right;
	}

	.content {
		max-height: 5rem;
		max-width: 20rem;
	}
</style>
