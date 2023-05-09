<script lang="ts">
  import QueryResultFlow from '../../../components/QueryResultFlow.svelte';
  import QueryResultService from '../../../components/QueryResultService.svelte';
  import { queryResults } from '../../../stores/query/query-store.js';
</script>

{#each $queryResults as result}
  {#if result.isServiceDescriptor }
    <QueryResultService serviceDescriptor={result.item} />
  {:else}
    {#if result.isFlowDescriptor }
      <QueryResultFlow flowDescriptor={result.item} />
    {/if}
  {/if}
{/each}
