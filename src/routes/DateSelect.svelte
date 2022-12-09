<script lang="ts">
	export let date: Date | null = null;
</script>

<input
	class="font-inherit hover:cursor-pointer invalid:border-scarlet-500 invalid:text-scarlet-900 invalid:placeholder-scarlet-300 h-12 rounded-md border bg-white px-4 shadow-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 md:text-sm border-gray-300 placeholder-gray-400 focus:border-violet-300 focus:ring-violet-300"
	type="date"
	min="1670531280000"
	bind:value={date}
/>
