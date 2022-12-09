<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { page } from '$app/stores';
	import Account from './Account.svelte';
	import Auth from './Auth.svelte';
	import Event from './Event.svelte';
	import Heading1 from './Heading1.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="font-dosis flex flex-col justify-center items-center">
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<a class="rachel" href="/rachel">Rachel's page</a>

	<Counter />

	{#if !$page.data.session}
		<Heading1 text="run retreats with one platform." />
		<Auth />
	{:else}
		<h1>Logged in</h1>
		<Account session={$page.data.session} />
		<Event userId={$page.data.session.user.id} />
	{/if}
</section>

<style>
	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
