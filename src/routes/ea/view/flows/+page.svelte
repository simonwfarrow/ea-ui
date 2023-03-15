
<script lang="ts">

    import { getPlantUrl, createFlowSequenceView} from "@electronic-architect/ea-diagrams";

    import {selectedFlowKey, flowStore} from "../../../../stores/flow";
    import {serviceStore} from "../../../../stores/service";

    let flowImgUrl = '';
    let flowKey = '';

    selectedFlowKey.subscribe(key => {
        flowKey = key;
        if (key!='') {
            //convert service map to an array to pass to drawing function
            // it uses the service array to add following references to get correct service data
            let services= [];
            for (const [key, service] of Object.entries($serviceStore)) {
                services.push(service);
            }
            createFlowSequenceView($flowStore[key],services).then(flow => {
                flowImgUrl = getPlantUrl(flow);
            })
        }
    })

</script>

{#if $flowStore[flowKey]!=null}
<div class="card variant-glass-primary p-4 shadow !text-white">
    <header>
        <h2 >{$flowStore[flowKey]?.name}</h2>
        <p>{$flowStore[flowKey]?.description}</p>
    </header>
    <!-- Body -->
    <div class="p-4 space-y-4">
        <figure class="flex justify-center"><img src={flowImgUrl}/></figure>
    </div>

</div>
{/if}


