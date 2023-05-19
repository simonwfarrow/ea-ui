import { writable } from 'svelte/store';

export const sankeyLinkColour = writable("source-target");
export const sankeyAlignment = writable("left");
export const sankeyData = writable(null);
