<script lang="ts">
  export let position: "top" | "bottom";
</script>

<div
  class="fixed right-0 h-[15vh] w-[50vw] z-50 from-black to-black/0 before:content-['_'] before:absolute before:h-[10vh] before:bg-black before:right-0 before:w-[50vw] before:z-50
  {position === 'top'
    ? 'top-[10vh] bg-gradient-to-b before:top-[-10vh]'
    : 'bottom-[10vh] bg-gradient-to-t before:bottom-[-10vh]'}"
/>
