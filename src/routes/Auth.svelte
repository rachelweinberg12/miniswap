<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import Button from './Button.svelte';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="inputField" type="email" placeholder="Your email" bind:value={email} />
		</div>
		<div>
			<Button class="button block" disabled={loading}
				>{loading ? 'Loading' : 'Send magic link'}</Button
			>
		</div>
	</div>
</form>
