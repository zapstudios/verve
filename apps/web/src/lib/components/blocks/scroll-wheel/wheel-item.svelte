<script lang="ts">
  export let index: number;
  export let title: string;
  export let isActive: boolean;
  export let isRepeat: boolean = false;
</script>

<div
  id={`category-${isRepeat ? "repeat-" : ""}${index}`}
  class="text-[5vh] duration-300 relative w-fit text-[#212121] antialiased"
>
  <span
    class="transition-main | duration-500 mix-blend-color-dodge bg-white absolute z-10 top-0 left-0 bottom-0
        {isActive ? 'w-full' : 'w-0'}"
  />
  {title}
</div>

<style>
  .transition-main {
    animation-timing-function: cubic-bezier(0.75, 0, 0.25, 1);
  }
</style>
