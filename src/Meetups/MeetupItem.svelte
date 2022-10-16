<script lang="ts">
	import Button from '../UI/Button.svelte';
	import Badge from '../UI/Badge.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { meetupsReducer } from './meetups-store';
  import { fetchData } from '$src/helpers/api';
  import { EDIT_MEETUP_END_POINT } from '$src/types/types';
  import Error from '../UI/Error.svelte';

	export let title: string = '';
	export let subtitle: string = '';
	export let imageUrl: string = '';
	export let description: string = '';
	export let address: string = '';
	export let id: string = '';
	export let isFavorite: boolean = false;
	let showApiErrorModal: boolean = false;
	let errorMessage: string = '';
	let isLoading = false;

	const dispatch = createEventDispatcher();

	const unsubscribe = meetupsReducer.isApiError((status) => {
		showApiErrorModal = status.errorStatus;
		errorMessage = status.errorMessage;
	});
	
	onDestroy(() => unsubscribe());

	function updateFavorite() {
		isLoading = true;
		fetchData({
				url: EDIT_MEETUP_END_POINT + `/${id}.json`,
				body: JSON.stringify({ isFavorite: !isFavorite }),
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((data) => {
				isLoading = false;
				meetupsReducer.updateFavorite(id);
			}).catch(error => meetupsReducer.setApiErrorTo({
				errorStatus: true,
				errorMessage: error
			}));
	}

	function resetErrorStatus() {
		showApiErrorModal = false;
		meetupsReducer.setApiErrorTo({
			errorStatus: false,
			errorMessage: ''
		});
	}

	function updatePageMode() {
		meetupsReducer.updateLandingPageMode({ mode: 'details', id });
	}
</script>

{#if showApiErrorModal}
	<Error message="{errorMessage}" on:cancel="{resetErrorStatus}" />
{/if}
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
		{#if isLoading}
      <!-- <LoadingSpinner /> -->
      <span>Changing...</span>
    {:else}
			<Button
				mode="outline"
				color={isFavorite ? '' : 'success'}
				type="button"
				on:click={updateFavorite}
			>
				<span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span>
			</Button>
    {/if}
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
