import { writable} from 'svelte/store';
import type {Writable}  from 'svelte/store';

export const navStore: Writable<string> = writable('view/services');
