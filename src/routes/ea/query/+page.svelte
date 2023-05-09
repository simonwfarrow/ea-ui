<script lang="ts">
  import {serviceStore} from "../../../stores/service";
  import {flowStore} from "../../../stores/flow";
  let serviceArray = [];
</script>

{#each serviceArray as result}
  <div class="card variant-glass-primary p-4 shadow !text-white">
    <dl class="list-dl">
      <div>
        <span class="badge bg-primary-500">💀</span>
        <span class="flex-auto">
			<dt>Title</dt>
			<dd>Description</dd>
		</span>
      </div>
      <!-- ... -->
    </dl>
  </div>
{/each}
