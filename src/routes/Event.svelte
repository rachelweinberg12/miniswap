<script lang="ts">
	import ShortTextBox from './ShortTextBox.svelte';
	import DateSelect from './DateSelect.svelte';
	import { supabase } from '$lib/supabaseClient';
	import Button from './Button.svelte';

	export let userId: string;

	let name: string | null = null;
	let start_date: Date | null = null;
	let end_date: Date | null = null;
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
		<ShortTextBox bind:text={name} />
	</div>
	<div>
		<label for="start_date">Start Date</label>
		<DateSelect bind:date={start_date} />
	</div>
	<div>
		<label for="end_date">End Date</label>
		<DateSelect bind:date={end_date} />
	</div>
	<div>
		<label for="description">Description</label>
		<ShortTextBox bind:text={description} />
	</div>
	<div>
		<Button>Updated button</Button>
	</div>
</form>
