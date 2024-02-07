<script lang="ts">
  import "../app.pcss";

  import { fly } from "svelte/transition";
  import { Navbar } from "$lib/components/layout";
  import LenisProvider from "$lib/components/render/lenis-provider.svelte";
  import { SITE_SETTINGS } from "../constants/settings";

  export let data;
</script>

<!-- <Navbar pathname={data.propsFromLayout.pathname} /> -->
{#if SITE_SETTINGS.lenis.enabled}
  <LenisProvider />
{/if}

{#key data.propsFromLayout.pathname}
  <div in:fly={{ duration: 600, delay: 300 }} out:fly={{ duration: 300 }}>
    <main class="min-h-screen">
      <slot />
    </main>
  </div>
{/key}
