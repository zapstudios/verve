<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  import Lenis from "@studio-freight/lenis";

  import { lenisStore as lenis, setLenisStore } from "$lib/stores/lenis";
  import { useFrame } from "$lib/lifecycle-functions/use-frame";
  import { page } from "$app/stores";

  let hash = "";

  $: if (browser && $lenis && hash) {
    const target = document.querySelector(hash);
    $lenis.scrollTo(target, { offset: 0, force: true, lock: true });
  }

  onMount(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenisInstance = new Lenis();
    setLenisStore(lenisInstance);

    function onLinkClick(e: MouseEvent) {
      e.preventDefault();

      const node = e.currentTarget;
      const nodeHash = (node as HTMLLinkElement).href.split("#").pop();

      hash = "#" + nodeHash;

      setTimeout(() => {
        window.location.hash = hash;
      }, 0);
    }

    const internalLinks: Element[] = [...document.querySelectorAll("[href]")].filter((node) =>
      (node as HTMLLinkElement).href.includes($page.url.pathname + "#")
    );

    internalLinks.forEach((node) => {
      (node as HTMLLinkElement).addEventListener("click", onLinkClick, false);
    });

    return () => {
      internalLinks.forEach((node) => {
        (node as HTMLLinkElement).removeEventListener("click", onLinkClick, false);
      });

      $lenis?.destroy();
    };
  });

  useFrame((time) => {
    $lenis?.raf(time);
  });
</script>
