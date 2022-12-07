<script lang="ts">
	export let data;

	export let form;
</script>

<!-- Allow chatting with ChatGPT -->
Talk to ChatGPT here
<form method="POST" action="?/chat">
	<input name="chat" />
	<button>Submit</button>
</form>
<div>
	<!-- Data is {JSON.stringify(data)} -->
	{#if form?.response}
		ChatGPT says: {form.response}
	{/if}
</div>

<style>
</style>
