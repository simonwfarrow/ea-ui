<script lang="ts">
  import { ServiceDescriptor } from '@electronic-architect/ea-services/src/index';
  import { faServer } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import QueryTermMatch from '../stores/query/query-term-match';
  import QueryResultMatchHighlight from './QueryResultMatchHighlight.svelte';

  export let storeKey: string;
  export let serviceDescriptor: ServiceDescriptor;
  export let matches: QueryTermMatch[];
</script>
<div class="card variant-glass-primary p-4 shadow !text-white mb-4">
  <dl class="list-dl">
    <div>
      <div class="flex-row list-nav">
        <div>
          <Fa icon={faServer} />
        </div>
        <div>
          <a href="/ea-ui/ea/services/{storeKey}" data-sveltekit-preload-data="hover">
            <span class="flex-auto">{serviceDescriptor.name}</span>
            <span class="badge variant-filled-secondary">{serviceDescriptor.status}</span>
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
