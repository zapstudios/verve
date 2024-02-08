<script lang="ts">
  import { Seo } from "$lib/components/layout";
  import { HeroToRender, RenderBlocks } from "$lib/components/render";

  export let data;

  const { layout, meta, hero } = data.page;
</script>

<Seo {...meta} />
<HeroToRender {...hero} />
<RenderBlocks {layout} />
