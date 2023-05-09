<script lang="ts">

    import {flowStore, selectedFlowKey} from "../../../../stores/flow";
    import {page} from "$app/stores";
    import Flow from "../../../../components/Flow.svelte";
    import {onMount} from "svelte";
    import {FlowDescriptor} from "@electronic-architect/ea-flows/src/index";

    let flow: FlowDescriptor;

    onMount(async() => {
        if ($page.params.slug!=null) {
            flow = $flowStore[$page.params.slug];
        }
    })

</script>

<Flow bind:flow={flow}></Flow>


