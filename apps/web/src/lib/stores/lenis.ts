import type Lenis from "@studio-freight/lenis";
import { writable } from "svelte/store";

/**
 * A Svelte writable store that holds a reference to a Lenis instance or null.
 * Lenis is typically used for smooth scrolling experiences.
 *
 * @type {import('svelte/store').Writable<Lenis | null>}
 * A writable store that can contain a Lenis instance or null.
 */
export const lenisStore = writable<Lenis | null>(null);

/**
 * Sets the provided Lenis instance to the lenisStore.
 * This function is used to update the store with a new Lenis instance,
 * usually when initializing or updating the Lenis configuration.
 *
 * @param {Lenis} lenis - The Lenis instance to be set in the store.
 */
export function setLenisStore(lenis: Lenis) {
  lenisStore.set(lenis);
}
