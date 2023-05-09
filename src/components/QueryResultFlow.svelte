<script lang="ts">
  import { FlowDescriptor } from '@electronic-architect/ea-flows/src/index';
  import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import QueryTermMatch from '../stores/query/query-term-match';
  import QueryResultMatchHighlight from './QueryResultMatchHighlight.svelte';

  export let storeKey: string;
  export let flowDescriptor: FlowDescriptor;
  export let matches: QueryTermMatch[];
</script>

<div class="card variant-glass-primary p-4 shadow !text-white mb-4">
  <dl class="list-dl">
    <div>
      <div class="flex-row list-nav">
        <div>
          <Fa icon={faDiagramProject} />
        </div>
        <div>
          <a href="/ea-ui/ea/flows/{storeKey}" data-sveltekit-preload-data="hover">
            <span class="flex-auto">{flowDescriptor.name}</span>
            <span class="badge variant-filled-secondary">{flowDescriptor.tags}</span>
          </a>
        </div>
        <div>
          {#each matches as queryTermMatch}
            <QueryResultMatchHighlight queryTermMatch={queryTermMatch} />
          {/each}
        </div>
      </div>
    </div>
  </dl>
</div>
