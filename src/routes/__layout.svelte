<script>
  import Navbar from "../lib/components/Navbar.svelte";

  import "../app.css";
</script>

<div style="background-image: url('plant1.jpg');">
  <!-- src: https://de.freepik.com/vektoren-premium/botanisches-nahtloses-tropisches-muster-mit-hellen-pflanzen-und-blaettern-auf-einem-hellen-hintergrund_7421050.htm -->
  <Navbar />
  <slot />
</div>
