<script lang="ts">
  import QueryResultFlow from '../../../components/QueryResultFlow.svelte';
  import QueryResultService from '../../../components/QueryResultService.svelte';
  import { queryResults } from '../../../stores/query/query-store.js';
</script>

{#each $queryResults as result}
  {#if result.isServiceDescriptor }
    <QueryResultService storeKey={result.storeKey} serviceDescriptor={result.item}
                        matches={result.matches}
    />
  {:else}
    {#if result.isFlowDescriptor }
      <QueryResultFlow storeKey={result.storeKey} flowDescriptor={result.item}
                       matches={result.matches} />
    {/if}
  {/if}
{/each}
