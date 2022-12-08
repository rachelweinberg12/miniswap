<script lang="ts">
	import ShortTextBox from './ShortTextBox.svelte';
	import DateSelect from './DateSelect.svelte';
	import { supabase } from '$lib/supabaseClient';

	export let userId: string;

	let name: string | null = null;
	let start_date: Date | null = null;
	let end_date: string | null = null;
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
		<ShortTextBox text={name} />
	</div>
	<div>
		<label for="start_date">Start Date</label>
		<input id="start_date" type="date" bind:value={start_date} />
	</div>
	<div>
		<label for="end_date">End Date</label>
		<DateSelect date={end_date} />
	</div>
	<div>
		<label for="description">Description</label>
		<ShortTextBox text={description} />
	</div>

	<div>
		<input type="submit" class="button block primary" value="Update" />
	</div>
</form>
