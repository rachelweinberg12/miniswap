<script lang="ts">
	// export let buttonProps = {

	// };
	console.log('restprops', $$restProps);
</script>

<button
	on:click
	{...$$restProps}
	class={'border border-violet-300 hover:bg-violet-300 hover:cursor-pointer hover:text-white active:bg-violet-500 bg-white px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' +
		$$restProps.class}
>
	<slot />
</button>
