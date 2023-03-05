import { writable } from 'svelte/store';
import type { ServiceDescriptor  } from "@electronic-architect/ea-services/src/@types/sdTypes";

export const serviceStore = writable<ServiceDescriptor[]>([]);
