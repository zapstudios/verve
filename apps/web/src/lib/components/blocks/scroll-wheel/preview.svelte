<script lang="ts">
  import { convertMedia } from "$lib/utils/convert-media";
  import type { Media } from "@repo/payload/types";
  import { fade } from "svelte/transition";

  export let image: Media | string;

  const media = convertMedia(image);
</script>

<div
  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"
  transition:fade={{ duration: 500, delay: 0 }}
>
  <img src={media.url} alt={media.alt} class="h-full w-full object-contain" />
</div>
