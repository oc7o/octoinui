<script lang="ts">
	import '../app.css';
	import { user } from '$lib/auth';
	import { basket } from '$lib/basket';

	import Navbar from '$lib/components/Navbar.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	export let data;

	$: user.set(data.user);
	$: basket.set(data.basket);
</script>

<div style="background-image: url('/plant1.jpg');">
	<Drawer>
		<Navbar />
		<slot />
	</Drawer>

	<!-- src: https://de.freepik.com/vektoren-premium/botanisches-nahtloses-tropisches-muster-mit-hellen-pflanzen-und-blaettern-auf-einem-hellen-hintergrund_7421050.htm -->
</div>

<Notifications />
