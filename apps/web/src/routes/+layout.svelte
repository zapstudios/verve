<script lang="ts">
  import "../app.pcss";

  import { SITE_SETTINGS } from "$lib/constants/settings";
  import { LenisProvider } from "$lib/components/render";
  import { RouteTransition } from "$lib/components/layout";

  export let data;
</script>

<!-- <Navbar pathname={data.propsFromLayout.pathname} /> -->
{#if SITE_SETTINGS.lenis.enabled}
  <LenisProvider />
{/if}

<RouteTransition {...data}>
  <slot />
</RouteTransition>
