<script lang="ts">
  import type { Page } from "cms/types";

  type Props = Extract<Page["layout"][0], { blockType: "welcome" }>;

  const { message } = $$props as Props;
</script>

<div class="h-screen bg-[#0b0b0a] grid place-items-center text-white">
  <div
    class="absolute inset-0 [background:radial-gradient(circle,rgba(11,11,10,0)0%,rgba(11,11,10,1)40%,rgba(11,11,10,1)100%)] z-10"
  />
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 opacity-[0.085]">
    <defs>
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="lightblue" stroke-width="0.5" />
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)" />
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="lightblue" stroke-width="1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
  <div class="flex items-center flex-col gap-y-12">
    <div class="relative w-fit">
      <div class=" w-48 h-48 rounded-3xl bg-gradient-to-b from-[#141414] to-[#202020] z-10 relative p-[2px]">
        <div class="h-full w-full bg-[#0b0b0a] rounded-[22px] grid place-items-center">
          <img
            src="/verve_logo.svg"
            alt="verve Logo"
            class="w-[45%] h-[45%] animate-pulse"
            style="animation-duration: 3000ms;"
          />
        </div>
      </div>
      <div
        class="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-40px)] bg-rose-500 w-24 h-12 rounded-full blur-[50px]"
        style="animation-duration: 3000ms; animation-delay: 750ms;"
      />
    </div>
  </div>
  <div class="absolute bottom-0 left-0 w-screen py-12 flex items-center justify-center gap-x-12">
    <div class="relative w-fit">
      <div class="rounded-2xl bg-gradient-to-b from-[#141414] to-[#202020] z-10 relative p-[2px]">
        <div class="h-full w-full bg-[#0b0b0a] rounded-[14px] flex flex-col items-start gap-4 px-6 py-4 pt-3">
          <span class="uppercase text-xs text-neutral-700">powered by</span>
          <img src="/logo_sec_full_dark.svg" alt="zap.studio Logo" class="h-4" />
        </div>
      </div>
    </div>
    <div class="relative w-fit">
      <div class="rounded-2xl bg-gradient-to-b from-[#141414] to-[#202020] z-10 relative p-[2px]">
        <div class="h-full w-full bg-[#0b0b0a] rounded-[14px] flex flex-col items-start gap-4 px-6 py-4 pt-3">
          <span class="uppercase text-xs text-neutral-700">message</span>
          <span class="text-md leading-[16px]">{message}</span>
        </div>
      </div>
    </div>
  </div>
</div>
