<script lang="ts">
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';
	import Modal from '../UI/Modal.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { isEmpty, isValidEmail } from '../helpers/validation';
	import { meetupsReducer } from './meetups-store';
  import { fetchData } from '$src/helpers/api';
  import { EDIT_MEETUP_END_POINT, ENP_POINT } from '$src/types/types';
  import Error from '../UI/Error.svelte';

	export let id: string = ''; // if id is present then it is `edit` mode else `add` mode
	let title: string = '';
	let subtitle: string = '';
	let address = '';
	let email: string = '';
	let description: string = '';
	let imageUrl: string = '';
	let isFormValid: boolean = false;
	let showApiErrorModal: boolean = false;
	let errorMessage: string = '';

	if (id) {
		const unsubscribe = meetupsReducer.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup?.title || '';
      subtitle = selectedMeetup?.subtitle || '';
      address = selectedMeetup?.address || '';
      email = selectedMeetup?.contactEmail || '';
      description = selectedMeetup?.description || '';
      imageUrl = selectedMeetup?.imageUrl || '';
    });

    unsubscribe();
	}

	const unsubscribe = meetupsReducer.isApiError((status) => {
		showApiErrorModal = status.errorStatus;
		errorMessage = status.errorMessage;
	});
	
	onDestroy(() => unsubscribe());

	const dispatch = createEventDispatcher();

	$: {
		isFormValid =
			!isEmpty(title) &&
			!isEmpty(subtitle) &&
			!isEmpty(address) &&
			!isEmpty(imageUrl) &&
			!isEmpty(imageUrl) &&
			isValidEmail(email) &&
			!isEmpty(description);
	}

	function submitForm() {
		/* It was dispatching an event that was handled by app.svelte
		dispatch('save', {
			title: title,
			subtitle: subtitle,
			description: description,
			imageUrl: imageUrl,
			contactEmail: email,
			address: address,
		}); */

		dispatch('save'); // required to close modal

		const meetup = {
			title,
			subtitle,
			description,
			imageUrl,
			contactEmail: email,
			address
		};

		if (!id) {
			fetchData({
				url: ENP_POINT,
				body: JSON.stringify(meetup),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(data => meetupsReducer.addMeetup({ ...meetup, id: data.name, isFavorite: false }))
			.catch(error => meetupsReducer.setApiErrorTo({
				errorStatus: true,
				errorMessage: error
			}));
		} else {
			fetchData({
				url: EDIT_MEETUP_END_POINT + `/${id}.json`,
				body: JSON.stringify({...meetup}),
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(data => meetupsReducer.updateMeetup(id, { id, ...data }))
			.catch(error => meetupsReducer.setApiErrorTo({
				errorStatus: true,
				errorMessage: error
			}));
		}
	}

	function resetErrorStatus() {
		showApiErrorModal = false;
		meetupsReducer.setApiErrorTo({
			errorStatus: false,
			errorMessage: ''
		});
	}
</script>

{#if showApiErrorModal}
	<Error message="{errorMessage}" on:cancel="{resetErrorStatus}" />
{:else}
	<Modal title="New Meetup" on:cancel>
		<form on:submit|preventDefault={submitForm}>
			<!-- title -->
			<TextInput
				id="title"
				label="Title"
				type="text"
				value={title}
				on:input={(event) => (title = event.target?.value)}
				isValid={!isEmpty(title)}
				errorMessage="Please enter valid Title"
			/>
			<!-- Subtitle -->
			<TextInput
				id="subtitle"
				label="Subtitle"
				type="text"
				value={subtitle}
				on:input={(event) => (subtitle = event.target?.value)}
				isValid={!isEmpty(subtitle)}
				errorMessage="Please enter valid Subtitle"
			/>
			<!-- Address -->
			<TextInput
				id="address"
				label="Address"
				type="text"
				value={address}
				on:input={(event) => (address = event.target?.value)}
				isValid={!isEmpty(address)}
				errorMessage="Please enter valid Address"
			/>
			<!-- Image -->
			<TextInput
				id="imageUrl"
				label="Image URL"
				type="text"
				value={imageUrl}
				on:input={(event) => (imageUrl = event.target?.value)}
				isValid={!isEmpty(imageUrl)}
				errorMessage="Please enter valid Image URL"
			/>
			<!-- Email -->
			<TextInput
				id="email"
				label="E-Mail"
				type="email"
				value={email}
				on:input={(event) => (email = event.target?.value)}
				isValid={isValidEmail(email)}
				errorMessage="Please enter valid email address"
			/>
			<!-- description -->
			<TextInput
				id="description"
				label="Description"
				controlType="textarea"
				value={description}
				on:input={(event) => (description = event.target?.value)}
				rows="3"
				isValid={!isEmpty(description)}
				errorMessage="Please enter some description regarding meetup"
			/>
		</form>
		<div slot="footer" class="button-group">
			<Button type="submit" on:click={submitForm} disable={!isFormValid}
				><span>Save</span></Button
			>
			<Button type="reset" on:click={() => dispatch('reset')} disable={false}
				><span>Clear</span></Button
			>
		</div>
	</Modal>
{/if}

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
