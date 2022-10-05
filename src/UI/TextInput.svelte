<script>
	export let controlType = undefined;
	export let id = undefined;
	export let label = undefined;
	export let rows = undefined;
	export let value = undefined;
	export let type = undefined;
	export let isValid = true;
	export let errorMessage = '';
	let didUserInteract = false;
</script>

<div class="form-control">
	<label for={id}>{label}</label>
	{#if controlType === 'textarea'}
		<textarea class:invalid={!isValid && didUserInteract} {rows} {id} {value} on:input on:blur={() => (didUserInteract = true)} />
	{:else}
		<input class:invalid={!isValid && didUserInteract} {type} {id} {value} on:input on:blur={() => (didUserInteract = true)} />
	{/if}
	{#if !isValid && errorMessage && didUserInteract}
		<p class="error-message">{errorMessage}</p>
	{/if}
</div>

<style>
	input,
	textarea {
		display: block;
		width: 100%;
		font: inherit;
		border: none;
		border-bottom: 2px solid #ccc;
		border-radius: 3px 3px 0 0;
		background: white;
		padding: 0.15rem 0.25rem;
		transition: border-color 0.1s ease-out;
	}

	input:focus,
	textarea:focus {
		border-color: #e40763;
		outline: none;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		width: 100%;
	}

	.form-control {
		padding: 0.5rem 0;
		width: 100%;
		margin: 0.25rem 0;
	}

	.invalid {
		border-color: red;
		background: #fde3e3;
	}

	.error-message {
		color: red;
		margin: 0.25rem 0;
	}
</style>
