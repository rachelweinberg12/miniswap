<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	export let size = 10;
	export let url: string;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}

	<div style="width: {size}em;">
		<label
			class="border border-violet-300 hover:bg-violet-300 hover:cursor-pointer hover:text-white active:bg-violet-500 bg-white px-4 py-2 my-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-center"
			for="single"
		>
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			class="hidden absolute border p-0 border-violet-300 hover:bg-violet-300 hover:cursor-pointer hover:text-white active:bg-violet-500 bg-white px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>

<style>
	.avatar {
		border-radius: 50%;
	}

	.avatar.image {
		object-fit: cover;
	}

	.avatar.no-image {
		background-color: #ccc;
	}
</style>
