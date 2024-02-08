<script lang="ts">
  import { PageSpacer, Seo } from "$lib/components/layout";
  import { RenderBlocks } from "$lib/components/render";

  export let data;

  const { layout, meta } = data.page;
</script>

<Seo {...meta} />

<PageSpacer>
  <RenderBlocks {layout} />
</PageSpacer>
