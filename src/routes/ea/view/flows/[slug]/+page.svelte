<script lang="ts">

    import {flowStore} from "../../../../../stores/flow";
    import {page} from "$app/stores";
    import { getPlantUrl, createFlowSequenceView} from "@electronic-architect/ea-diagrams";
    import {serviceStore} from "../../../../../stores/service";

    let flowImgUrl = '';

    $: {
        if ($page.params.slug !=null) {
            if ($flowStore[$page.params.slug]!=null) {
                let services = [];
                for (const [key, service] of Object.entries($serviceStore)) {
                    services.push(service);
                }
                createFlowSequenceView($flowStore[$page.params.slug], services).then(flow => {
                    flowImgUrl = getPlantUrl(flow);
                })
            }
        }
    }
</script>


<div class="card variant-glass-primary p-4 shadow !text-white">
    <header>
        <h2 >{$flowStore[$page.params.slug]?.name}</h2>
        <p>{$flowStore[$page.params.slug]?.description}</p>
    </header>
    <!-- Body -->
    <div class="p-4 space-y-4">
        <figure class="flex justify-center"><img src={flowImgUrl}/></figure>
    </div>

</div>

