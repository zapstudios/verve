<script lang="ts">
  import type { Category } from "@repo/payload/types";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Blend, Preview, WheelItem } from "./scroll-wheel";
  import Lenis from "@studio-freight/lenis";
  import { lenisStore as lenis, setLenisStore } from "$lib/stores/lenis";

  export let categories: Array<Category>;

  let activeCategoryTitle = "";
  let observers: Array<IntersectionObserver> = [];

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList(),
    });

    categories.forEach((_, i) => {
      const originalElement = document.getElementById(`category-${i}`);
      if (originalElement) observer.observe(originalElement);

      const repeatedElement = document.getElementById(`category-repeat-${i}`);
      if (repeatedElement) observer.observe(repeatedElement);
    });

    observers.push(observer); // Store the observer for cleanup
  });

  $: if (browser && $lenis) {
    setLenisStore(new Lenis({ infinite: true }));
  }

  onDestroy(() => observers.forEach((observer) => observer.disconnect()));

  function handleIntersect(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const categoryIndex = entry.target.id.replace(/^\D+/g, ""); // Remove all leading non-digits
        const categoryTitle = categories[+categoryIndex]?.title;

        if (categoryTitle) activeCategoryTitle = categoryTitle;
      }
    });
  }

  function buildThresholdList() {
    let thresholds = [];
    for (let i = 1.0; i <= 100; i++) {
      let ratio = i / 100;
      thresholds.push(ratio);
    }
    return thresholds;
  }
</script>

<div class="pl-[50vw] min-h-screen bg-black text-white relative">
  <div class="fixed top-0 left-0 w-[50vw] h-screen">
    {#each categories as category}
      {#if activeCategoryTitle === category.title}
        <Preview image={category.image} />
      {/if}
    {/each}
  </div>

  <Blend position="top" />
  <div>
    <div class="min-h-screen flex flex-col justify-between">
      {#each categories as category, i}
        <WheelItem
          index={i}
          title={category.title}
          isActive={activeCategoryTitle === category.title}
        />
      {/each}
      {#each categories as category, i}
        <WheelItem
          index={i}
          title={category.title}
          isActive={activeCategoryTitle === category.title}
          isRepeat
        />
      {/each}
    </div>
  </div>
  <div class="min-h-screen flex flex-col justify-between">
    {#each categories as category, i}
      <WheelItem
        index={i}
        title={category.title}
        isActive={activeCategoryTitle === category.title}
      />
    {/each}
    {#each categories as category, i}
      <WheelItem
        index={i}
        title={category.title}
        isActive={activeCategoryTitle === category.title}
        isRepeat
      />
    {/each}
  </div>
  <Blend position="bottom" />
</div>
