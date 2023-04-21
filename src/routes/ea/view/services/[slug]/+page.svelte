
<script lang="ts">


    import {createServiceInteractionView, getPlantUrl} from "@electronic-architect/ea-diagrams";

    import { serviceStore} from "../../../../../stores/service";
    import {page} from "$app/stores";

    let serviceImgUrl = '';

    $: {
        if ($page.params.slug!=null) {
            if ($serviceStore[$page.params.slug]!=null) {
                serviceImgUrl = getPlantUrl(createServiceInteractionView($serviceStore[$page.params.slug]))
            }
        }
    }


</script>


<div class="card variant-glass-primary p-4 shadow !text-white ">
    <header>
        <h2>{$serviceStore[$page.params.slug]?.name}</h2>
        <p>{$serviceStore[$page.params.slug]?.description}</p>
    </header>
    <!-- Body -->
    <div class="p-4 space-y-4" >
        <figure class="flex justify-center"><img src={serviceImgUrl}/></figure>
    </div>

</div>



