<script lang="ts">
  import type { Media, Page } from "cms/types";

  const { description, image, title } = $$props as Page["meta"];

  const getImgUrl = (media: string | Media) => {
    if (typeof media === "string") {
      return media;
    } else if (media.url) {
      return media.url;
    }
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <!-- <meta property="og:image" content={getImgUrl(image)} /> -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sveltejs" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <!-- <meta name="twitter:image" content={getImgUrl(image)} /> -->
</svelte:head>
