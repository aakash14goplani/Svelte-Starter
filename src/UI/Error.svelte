<script lang="ts">
  import Modal from './Modal.svelte';

  export let message: string = '';
</script>

{#if message}
  <Modal title="An error occurred!" on:cancel>
    <p>{message}</p>
  </Modal>
{/if}