<script lang="ts">
  import { PageSpacer } from "$lib/components/layout";
  import { RenderBlocks } from "$lib/components/render";

  export let data;

  const { page } = data;

  const { layout } = page;
</script>

<PageSpacer>
  <RenderBlocks {layout} />
</PageSpacer>
