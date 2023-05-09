import type { FlowDescriptor } from '@electronic-architect/ea-flows/src/@types/fdTypes';
import { derived, writable } from 'svelte/store';
import { flowStore } from '../flow';
import { serviceStore } from '../service';
import QueryResult from './query-result';

function stringMatchesQueryTerms(stringToSearch: string, queryTerms: string[]) {
  for (const term of queryTerms) {
    if (stringToSearch.toLowerCase().indexOf(term.toLowerCase()) === -1) {
      return false;
    }
  }

  // returning true only if previous loop did not return false and there are query terms
  return queryTerms.length > 0;
}

export let queryTerms = writable<string[]>([]);

export const queryResultsStore = writable<Map<string, FlowDescriptor>>(new Map());

export const queryResults = derived([queryTerms, serviceStore, flowStore], ([$queryTerms, $serviceStore, $flowStore]) => {
  const results: QueryResult[] = [];
  for (let [key, serviceDescriptor] of Object.entries($serviceStore)) {
    const serviceDescriptorAsString = JSON.stringify(serviceDescriptor);
    if (stringMatchesQueryTerms(key, $queryTerms)
      || stringMatchesQueryTerms(serviceDescriptorAsString, $queryTerms)) {
      const result = QueryResult.fromServiceDescriptor(serviceDescriptor);
      results.push(result);
    }
  }

  for (let [key, flowDescriptor] of Object.entries($flowStore)) {
    const flowDescriptorAsString = JSON.stringify(flowDescriptor);
    console.log(`${flowDescriptor.name} => ${flowDescriptorAsString.toLowerCase().indexOf('proxying')}`);
    if (stringMatchesQueryTerms(key, $queryTerms)
      || stringMatchesQueryTerms(flowDescriptorAsString, $queryTerms)) {
      const result = QueryResult.fromFlowDescriptor(flowDescriptor);
      results.push(result);
    }
  }

  return results;
});
