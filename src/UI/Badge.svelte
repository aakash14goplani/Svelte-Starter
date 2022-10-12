<script>
  import { slide } from "svelte/transition";
</script>

<span transition:slide>
	<slot />
</span>

<style>
	span {
		display: inline-block;
		margin: 0 0.25rem;
		border-radius: 3px;
		border: 1px solid #cf0056;
		background-color: #cf0056;
		color: white;
		padding: 0.25rem;
		font-size: 0.8rem;
		font-family: 'LATO', sans-serif;
	}
</style>
