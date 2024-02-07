import type { Media } from "@repo/payload/types";

export const convertMedia = (media: Media | string): { url: string; alt: string } | Media => {
  return typeof media === "string" ? { url: media, alt: "" } : media;
};
