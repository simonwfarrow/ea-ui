<script lang="ts">
  export let flowDescriptor: FlowDescriptor;
  import { FlowDescriptor } from '@electronic-architect/ea-flows/src/index';
  import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
</script>

<div class="card variant-glass-primary p-4 shadow !text-white mb-4">
  <dl class="list-dl">
    <div>
      <div class="flex-row">
        <div><Fa icon={faDiagramProject} /></div>
        <div>{flowDescriptor.name}</div>
      </div>
    </div>
  </dl>
</div>
