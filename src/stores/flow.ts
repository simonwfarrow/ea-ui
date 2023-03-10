import { writable } from 'svelte/store';
import type { FlowDescriptor  } from "@electronic-architect/ea-flows/src/@types/fdTypes";

export const flowStore = writable<Map<string,FlowDescriptor>>(new Map());

export const selectedFlowKey = writable('');
