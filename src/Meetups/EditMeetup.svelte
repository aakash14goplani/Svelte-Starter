<script>
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	let title = '';
	let subtitle = '';
	let address = '';
	let email = '';
	let description = '';
	let imageUrl = '';

	const dispatch = createEventDispatcher();

	function submitForm() {
		dispatch('save', {
			title: title,
			subtitle: subtitle,
			description: description,
			imageUrl: imageUrl,
			contactEmail: email,
			address: address,
		});
	}
</script>

<Modal title="New Meetup" on:cancel>
	<form on:submit|preventDefault={submitForm}>
		<TextInput id="title" label="Title" type="text" value={title} on:input={(event) => (title = event.target.value)} />
		<TextInput id="subtitle" label="Subtitle" type="text" value={subtitle} on:input={(event) => (subtitle = event.target.value)} />
		<TextInput id="address" label="Address" type="text" value={address} on:input={(event) => (address = event.target.value)} />
		<TextInput id="imageUrl" label="Image URL" type="text" value={imageUrl} on:input={(event) => (imageUrl = event.target.value)} />
		<TextInput id="email" label="E-Mail" type="email" value={email} on:input={(event) => (email = event.target.value)} />
		<TextInput id="description" label="Description" controlType="textarea" value={description} on:input={(event) => (description = event.target.value)} rows="3" />
	</form>
	<div slot="footer" class="button-group">
		<Button type="submit" on:click={submitForm}><span>Save</span></Button>
		<Button type="reset" on:click={() => dispatch('reset')}><span>Clear</span></Button>
	</div>
</Modal>

<style>
	form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
	}
</style>
