<script lang="ts">
    import {flowStore, selectedFlowKey} from "../stores/flow";
    import {FlowDescriptor} from "@electronic-architect/ea-flows/src/index";
    import {onMount} from "svelte";

    let flow: FlowDescriptor;

    selectedFlowKey.subscribe(key => {
        flow = $flowStore[key];
    })

    onMount(async() => {
        flow = new FlowDescriptor();
        flow.name = 'test';
    })

</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">

    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Info</div>
    <!-- Navigation List -->
    <div class="grid grid-cols-1 gap-4 text-center text-xs font-bold">
        <label class="label col-span-2">
            <span>Name</span>
            <input class="input p-1" type="text" bind:value={flow.name}/>
        </label>
        <label class="label col-span-2">
            <span>Description</span>
            <input class="input p-1" type="text" bind:value={flow.description}/>
        </label>
    </div>

    <!--<div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Commands</div>

    <div class="grid grid-cols-1 gap-4 text-center text-xs font-bold">
        <button class="btn variant-filled">
            <span>Load Flow</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCloudArrowDown}/></span>
        </button>
        <button class="btn variant-filled">
            <span>Save Flow</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCloudArrowUp}/></span>
        </button>

    </div>-->

</section>

