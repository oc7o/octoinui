<script context="module">
  import houdiniClient from "../client";

  houdiniClient.init();
</script>

<script>
  import Navbar from "../lib/components/Navbar.svelte";
  import AccountWrapper from "../lib/components/AccountWrapper.svelte";
  import Drawer from "$lib/components/Drawer.svelte";

  import "../app.css";
</script>

<AccountWrapper>
  <div style="background-image: url('/plant1.jpg');">
    <!-- src: https://de.freepik.com/vektoren-premium/botanisches-nahtloses-tropisches-muster-mit-hellen-pflanzen-und-blaettern-auf-einem-hellen-hintergrund_7421050.htm -->
    <Drawer>
      <Navbar />
      <slot />
    </Drawer>
  </div>
</AccountWrapper>
