
<script lang="ts">


    import {createServiceInteractionView, getPlantUrl} from "@electronic-architect/ea-diagrams";

    import { serviceStore} from "../../../../stores/service";
    import {page} from "$app/stores";

    let serviceImgUrl = '';
    let serviceName = '';

    $: {
        if ($page.params.slug!=null) {
            if ($serviceStore[$page.params.slug]!=null) {
                //serviceImgUrl = getPlantUrl(createServiceInteractionView($serviceStore[$page.params.slug]))
                serviceName = $page.params.slug.toLowerCase().replaceAll(' ','');

            }
        }
    }


</script>


<!--<div class="card variant-glass-primary p-4 shadow !text-white ">
    <header>
        <h2>{$serviceStore[$page.params.slug]?.name}</h2>
        <p>{$serviceStore[$page.params.slug]?.description}</p>
    </header>

    <div class="p-4 space-y-4" >
        <figure class="flex justify-center"><img src={serviceImgUrl}/></figure>
    </div>

</div>-->

<div class="card variant-glass-primary p-4 shadow !text-white flex flex-col h-full">

    <iframe style="width: inherit; height: inherit;" src="https://github.worldpay.com/pages/access-for-ecom-doc/documentation/engineering/architecture/service-catalogue/{serviceName}"></iframe>

</div>


