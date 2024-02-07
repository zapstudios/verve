<script lang="ts">
  import type { Page } from "cms/types";

  type Props = Extract<Page["layout"][0], { blockType: "welcome" }>;

  const { message } = $$props as Props;
</script>

<div class="h-[200vh] grid place-items-center">
  {message}
</div>
