<script lang="ts">
  import type { Page } from "cms/types";
  import * as Blocks from "$lib/components/blocks";

  // Extract the block type from the layout array
  type ExtractBlockType<T> = T extends { blockType: infer BT } ? BT : never;

  type Block = {
    blockType: string;
  } & Record<string, unknown>;

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

  /**
   * Generate the props for the component
   * @param block
   */
  const generateGivenProps = (block: Block) => {
    /**
     * Remove the blockType from the props, so we can spread the
     * rest and won't get a warning
     */
    const propsWithoutBlockType = Object.keys(block).reduce(
      (acc, key) => {
        if (key !== "blockType") {
          acc[key] = block[key];
        }
        return acc;
      },
      {} as Record<string, unknown>
    );

    let givenProps = { ...propsWithoutBlockType };

    return givenProps as any;
  };
</script>

{#each layout as block}
  <svelte:component this={getComponent(block.blockType)} {...generateGivenProps(block)} />
{/each}
