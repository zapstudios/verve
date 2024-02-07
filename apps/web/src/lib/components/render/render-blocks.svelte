<script lang="ts">
  import type { Page } from "cms/types";
  import * as Blocks from "$lib/components/blocks";

  // Extract the block type from the layout array
  type ExtractBlockType<T> = T extends { blockType: infer BT } ? BT : never;

  // Get the block type from the layout array
  type BlockTypes = ExtractBlockType<Page["layout"][number]>;

  // Get the keys of the Blocks object
  type BlockKeys = keyof typeof Blocks;

  // Extract props
  const { layout } = $$props;

  /**
   * Get the component from the Blocks object (svelte components)
   * @param blockType
   */
  const getComponent = (blockType: BlockTypes) => {
    const componentName = (blockType.charAt(0).toUpperCase() + blockType.slice(1)) as BlockKeys;
    return Blocks[componentName];
  };
</script>

{#each layout as { blockType, ...props }}
  <svelte:component this={getComponent(blockType)} {...props} />
{/each}
