import type { FlowDescriptor } from '@electronic-architect/ea-flows/src/@types/fdTypes';
import { derived, writable } from 'svelte/store';
import { flowStore } from '../flow';
import { serviceStore } from '../service';
import QueryResult from './query-result';
import QueryTermMatch from './query-term-match';

function lookupQueryTermMatches(stringToSearch: string, queryTerms: string[]) {
  const queryTermMatches = [];

  for (const term of queryTerms) {
    const regExString = `"([^"]+)":"(([^"]*)${term}([^"]*))"`;
    const regEx = new RegExp(regExString,"i");
    let regExMatches = stringToSearch.match(regEx);
    if (regExMatches) {
      const queryTermMatch = new QueryTermMatch(term, regExMatches);
      queryTermMatches.push(queryTermMatch);
    } else {
      return [];
    }
  }

  return queryTermMatches;
}

export let queryTerms = writable<string[]>([]);

export const queryResultsStore = writable<Map<string, FlowDescriptor>>(new Map());

export const queryResults = derived([queryTerms, serviceStore, flowStore], ([$queryTerms, $serviceStore, $flowStore]) => {
  const results: QueryResult[] = [];
  for (let [storeKey, serviceDescriptor] of Object.entries($serviceStore)) {
    const serviceDescriptorAsString = JSON.stringify(serviceDescriptor);
    const matches = lookupQueryTermMatches(serviceDescriptorAsString, $queryTerms);
    if (matches.length > 0) {
      const result = QueryResult.fromServiceDescriptor(storeKey, serviceDescriptor, matches);
      results.push(result);
    }
  }

  for (let [storeKey, flowDescriptor] of Object.entries($flowStore)) {
    const flowDescriptorAsString = JSON.stringify(flowDescriptor);
    const matches = lookupQueryTermMatches(flowDescriptorAsString, $queryTerms);
    if (matches.length > 0) {
      const result = QueryResult.fromFlowDescriptor(storeKey, flowDescriptor, matches);
      results.push(result);
    }
  }

  return results;
});
