<script>
	import '../app.css';

	import Navbar from '../lib/components/Navbar.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
</script>

<div style="background-image: url('/plant1.jpg');">
	<Drawer>
		<Navbar />
		<slot />
	</Drawer>

	<!-- src: https://de.freepik.com/vektoren-premium/botanisches-nahtloses-tropisches-muster-mit-hellen-pflanzen-und-blaettern-auf-einem-hellen-hintergrund_7421050.htm -->
</div>
