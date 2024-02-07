<script lang="ts">
  import type { Media } from "cms/types";

  const {
    className,
    resource,
    htmlElement = "div",
  } = $$props as {
    className: string;
    resource: Media;
    htmlElement: HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | "div";
  };

  const isVideo = typeof resource !== "string" && resource?.mimeType?.includes("video");
  const Tag = htmlElement as any;
</script>

<svelte:element this={Tag} class={className}>
  {#if isVideo}
    <video
      controls
      preload="metadata"
      class="w-full h-full object-cover object-center"
      src={resource?.url}
    >
      <track kind="captions" />
    </video>
  {:else}
    <img class="w-full h-full object-cover object-center" src={resource?.url} alt={resource?.alt} />
  {/if}
</svelte:element>
