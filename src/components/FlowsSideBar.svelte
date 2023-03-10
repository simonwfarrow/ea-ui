<script lang="ts">

    import {flowStore, selectedFlowKey} from "../stores/flow";

    function setFlow(key: string) {
        selectedFlowKey.set(key);
    }

</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Flows</div>
    <!-- Navigation List -->
    <nav class="list-nav">
        <ul>
            {#each Object.entries($flowStore) as [key,flow]}
                <li on:click={setFlow(key)} on:keypress>
                    <a href="/ea/view/flows" data-sveltekit-preload-data="hover">
                        <span class="flex-auto">{flow.name}</span>
                        <span class="badge variant-filled-secondary">{flow.tags}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</section>
