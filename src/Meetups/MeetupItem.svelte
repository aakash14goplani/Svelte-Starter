<script>
	import Button from '../UI/Button.svelte';
	import Badge from '../UI/Badge.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title;
	export let subtitle;
	export let imageUrl;
	export let description;
	export let address;
	export let email;
	export let id;
	export let isFavorite;

	const dispatch = createEventDispatcher();
</script>

<article class={'meetup-item-' + id}>
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
			<Button type="button" on:click={() => dispatch('delete', id)} disable="{false}"><span>X</span></Button>
		</div>
	</header>
	<div class="image">
		<img src={imageUrl} alt={title} />
	</div>
	<div class="content">
		<p>{description}</p>
	</div>
	<footer>
		<Button href="mailto:{email}" type="button" disable="{false}"><span>Contact</span></Button>
		<Button mode="outline" color={isFavorite ? '' : 'success'} type="button" on:click={() => dispatch('togglefavorite', id)} disable="{false}"><span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span></Button>
		<Button type="button" disable="{false}"><span>Show Details</span></Button>
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
		font-size: 1.25rem;
		margin: 0.5rem 0;
		font-family: 'Roboto Slab', sans-serif;
	}

	h1.is-favorite {
		background: #01a129;
		color: white;
		padding: 0 0.5rem;
		border-radius: 5px;
	}

	h2 {
		font-size: 1rem;
		color: #808080;
		margin: 0.5rem 0;
	}

	p {
		font-size: 1.25rem;
		margin: 0;
	}

	div {
		text-align: right;
	}

	.content {
		height: 4rem;
	}
</style>
