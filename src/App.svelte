<script>
  import ContactCard from "./ContactCard.svelte";

  export let name = ""; // set from props in main.js
  let title = "";
  let image = "";
  let description = "";

  let formState = "";
  let contactDetails = [];

  const checkFormValidity = () => {
    formState = !!name && !!title && !!image && !!description ? "done" : "invalid";

    if (formState === "done") {
      contactDetails = [...contactDetails, { name, title, image, description }];
    }
  };
</script>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
  <div class="form-control">
    <button type="submit" on:click={checkFormValidity}>
      <span>Submit Value</span>
    </button>
  </div>
</div>

{#if formState === "done"}
  {#each contactDetails as contact, i}
    <p>{"#" + (i + 1)}</p>
    <ContactCard userName={contact.name} jobTitle={contact.title} description={contact.description} userImage={contact.image} />
  {:else}
    <p class="initial">Please enter all values!</p>
  {/each}
{:else if formState === "invalid"}
  <p class="invalid">Please Enter Valid data!</p>
{:else}
  <p class="initial">Please enter all values!</p>
{/if}

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }

  .invalid,
  .initial {
    color: red;
  }
</style>
