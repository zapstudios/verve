<script lang="ts">
  import type { Page } from "cms/types";
  import * as Heros from "$lib/components/heros";

  // Extract the hero type from the page
  type BlockTypes = Page["hero"]["type"];

  // Get the keys of the Heros object
  type BlockKeys = keyof typeof Heros;

  // Extract props
  const { type: heroType, ...restProps } = $$props as {
    type: BlockTypes;
    [key: string]: any;
  };

  /**
   * Get the component from the Heros object (svelte components)
   * @param blockType
   */
  const getComponent = (blockType: BlockTypes) => {
    const componentName = (blockType.charAt(0).toUpperCase() + blockType.slice(1)) as BlockKeys;
    // TODO: Fix this type error. Working in `$lib/components/render/render-blocks.svelte` but not here.
    return Heros[componentName] as any;
  };
</script>

{#if heroType !== "none"}
  <svelte:component this={getComponent(heroType)} {...restProps} />
{/if}
