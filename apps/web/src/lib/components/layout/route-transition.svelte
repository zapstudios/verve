<script lang="ts">
  import { fly } from "svelte/transition";

  const { pathname } = $$props.propsFromLayout;
</script>

{#key pathname}
  <div in:fly={{ duration: 600, delay: 300 }} out:fly={{ duration: 300 }}>
    <slot />
  </div>
{/key}
