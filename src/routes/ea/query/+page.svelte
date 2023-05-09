<script lang="ts">
  import QueryResultFlow from '../../../components/QueryResultFlow.svelte';
  import QueryResultService from '../../../components/QueryResultService.svelte';
  import { queryResults } from '../../../stores/query/query-store.js';
</script>

{#each $queryResults as result}
  {#if result.isServiceDescriptor }
    <QueryResultService storeKey={result.storeKey} serviceDescriptor={result.item} />
  {:else}
    {#if result.isFlowDescriptor }
      <QueryResultFlow storeKey={result.storeKey} flowDescriptor={result.item} />
    {/if}
  {/if}
{/each}
