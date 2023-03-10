
<script lang="ts">

    import { createServiceInteractionView, getPlantUrl} from "@electronic-architect/ea-diagrams";

    import {selectedServiceKey, serviceStore} from "../../../../stores/service";

    let serviceImgUrl = '';
    let serviceKey = '';


    selectedServiceKey.subscribe(key => {
        serviceKey = key;
        if (key!='') {
            serviceImgUrl = getPlantUrl(createServiceInteractionView($serviceStore[key]));
        }
    })


</script>

{#if $serviceStore[serviceKey]!=null}
    <div class="card variant-glass-primary p-4 shadow !text-white ">
        <header>
            <h2>{$serviceStore[serviceKey]?.name}</h2>
            <p>{$serviceStore[serviceKey]?.description}</p>
        </header>
        <!-- Body -->
        <div class="p-4 space-y-4" >
            <figure class="flex justify-center"><img src={serviceImgUrl}/></figure>
        </div>

    </div>
{/if}


