<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	export let userId: string;

	let name: string | null = null;
	let start_date: Date | null = null;
	let end_date: Date | null = null;
	let owner: string | null = null;
	let description: string | null = null;

	async function createEvent() {
		const { data, error } = await supabase.from('events').insert([
			{
				name,
				description,
				owner: userId,
				start_date,
				end_date
			}
		]);
	}
</script>

<form class="form-widget" on:submit|preventDefault={createEvent}>
	<div>
		<label for="name">Event Name</label>
		<input id="name" type="text" bind:value={name} />
	</div>
	<div>
		<label for="start_date">Start Date</label>
		<input id="start_date" type="date" bind:value={start_date} />
	</div>
	<div>
		<label for="end_date">End Date</label>
		<input id="end_date" type="date" bind:value={end_date} />
	</div>
	<div>
		<label for="description">Description</label>
		<input id="description" type="text" bind:value={description} />
	</div>

	<div>
		<input type="submit" class="button block primary" value="Update" />
	</div>
</form>
