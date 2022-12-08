<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';
	import Avatar from './Avatar.svelte';

	export let session: AuthSession;

	console.log('session in account:', session);

	let loading = false;
	let username: string | null = null;
	let firstname: string | null = null;
	let lastname: string | null = null;
	let bio: string | null = null;
	let avatarUrl: string = 'default_profile.jpeg';

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`username, bio, firstname, lastname, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				bio = data.bio;
				firstname = data.firstname;
				lastname = data.lastname;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	async function updateProfile() {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				firstname,
				lastname,
				bio,
				avatar_url: avatarUrl,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-widget" on:submit|preventDefault={updateProfile}>
	<!-- Show a placeholder with via -->
	<Avatar bind:url={avatarUrl} size={10} on:upload={updateProfile} />
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={session.user.email} disabled />
	</div>
	<div>
		<label for="username">Username</label>
		<input id="username" type="text" bind:value={username} />
	</div>
	<div>
		<label for="firstname">First Name</label>
		<input id="firstname" type="text" bind:value={firstname} />
	</div>
	<div>
		<label for="lastname">Last Name</label>
		<input id="lastname" type="text" bind:value={lastname} />
	</div>
	<div>
		<label for="bio">Bio</label>
		<input id="bio" type="text" bind:value={bio} />
	</div>

	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<div>
		<button class="button block" on:click={signOut} disabled={loading}>Sign Out</button>
	</div>
</form>
