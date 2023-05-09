<script lang="ts">
  import { ServiceDescriptor } from '@electronic-architect/ea-services/src/index';
  import { faServer } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let serviceDescriptor: ServiceDescriptor;
</script>

<div class="card variant-glass-primary p-4 shadow !text-white mb-4">
  <dl class="list-dl">
    <div>
      <div class="flex-row">
        <div><Fa icon={faServer} /></div>
          <div>{serviceDescriptor.name}</div>
		    </div>
    </div>
  </dl>
</div>
