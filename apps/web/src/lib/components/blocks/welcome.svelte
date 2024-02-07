<script lang="ts">
  import type { Page } from "cms/types";

  type Props = Extract<Page["layout"][0], { blockType: "welcome" }>;

  const { message } = $$props as Props;
</script>

<div class="h-screen bg-[#0b0b0a] grid place-items-center">
  <div class="flex items-center gap-x-[2vw]">
    <div class="relative w-fit">
      <div
        class=" w-[5vw] h-[5vw] rounded-[1vw] bg-gradient-to-br from-[#141414] to-[#2b2b2b] z-10 relative p-[2px]"
      >
        <div
          class="h-full w-full bg-[#0b0b0a] rounded-[calc(1vw-1px)] grid place-items-center"
        >
          <img
            src="/logo_prm_compact_dark.svg"
            alt="zap.studio Logo"
            class="w-[33%] h-[33%]"
          />
        </div>
      </div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-2vw)] bg-purple-700 w-24 h-12 rounded-full blur-[50px]"
      />
    </div>
    <span class="text-[2vw] font-thin text-neutral-900">+</span>
    <div class="relative w-fit">
      <div
        class=" w-[5vw] h-[5vw] rounded-[1vw] bg-gradient-to-b from-[#141414] to-[#202020] z-10 relative p-[2px]"
      >
        <div
          class="h-full w-full bg-[#0b0b0a] rounded-[calc(1vw-1px)] grid place-items-center"
        >
          <img src="/verve_logo.svg" alt="verve Logo" class="w-[45%] h-[45%]" />
        </div>
      </div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-1vw)] bg-rose-500 w-24 h-12 rounded-full blur-[50px]"
      />
    </div>
  </div>
</div>
