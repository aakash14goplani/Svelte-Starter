<script>
  import ContactCard from "./ContactCard.svelte";

  export let name;
  let age = "28";
  let jobDescription = "This is a demo project";
  let imageURL = "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg";
  let jobTitle = "Job Title";

  $: upperCaseName = name.toUpperCase();
  $: console.log(name);
  $: console.log(age);

  const incrementAge = () => age++;
  const decrementAge = function () {
    age--;
  };
  const formatName = () => (name = "Aakash");
  const nameChange = (event) => {
    console.log(event);
    name = event.target.value;
  };
</script>

<h1>Hello my name is {name + " " + upperCaseName} and my age is {age}!</h1>
<button on:click={incrementAge}>Increment Age</button> |
<button on:click={decrementAge}>Decrement Age</button> |
<button on:click={formatName}>Format Name</button>

<br />

<div>
  <label for={name}>Enter Name:</label>
  <input type="text" value={name} on:input={nameChange} />
</div>
<div>
  <label for={name + "-2"}>Enter Name Again:</label>
  <input type="text" bind:value={name} />
</div>
<div>
  <label for="jobTitle">Enter Job Title:</label>
  <input type="text" bind:value={jobTitle} />
</div>
<div>
  <label for="jobDescription">Enter Job Description:</label>
  <textarea rows="3" cols="25" bind:value={jobDescription} />
</div>
<div>
  <label for="imageURL">Enter Image URL:</label>
  <input type="text" bind:value={imageURL} />
</div>

<ContactCard userName={name} {jobDescription} {imageURL} {jobTitle} />

<style>
  h1 {
    color: purple;
  }
</style>
