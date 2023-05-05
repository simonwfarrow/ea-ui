import { derived, writable } from 'svelte/store';
import type ADR from './adr';

export const allADRs = writable<ADR[]>([]);

export const openADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isOpen).length;
});

export const closedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isClosed).length;
});

export const identifiedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isIdentified).length;
});

export const proposedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isProposed).length;
});

export const acceptedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isAccepted).length;
});

export const provingADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isBeingProved).length;
});

export const adoptedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isAdopted).length;
});

export const rejectedADRs = derived(allADRs, ($allADRs) => {
  return $allADRs.filter(adr => adr.isRejected).length;
});

export const meanTimeToResolution = derived(allADRs, ($allADRs) => {
  const closedADRs = $allADRs.filter(adr => adr.isClosed);
  if (closedADRs.length === 0) {
    return 0;
  }
  return Math.round(closedADRs.reduce((total, adr) => total + adr.ttrInDays, 0) / closedADRs.length);
});
