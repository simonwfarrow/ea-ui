
<script lang="ts">

    import { createServiceInteractionView, getPlantUrl} from "@electronic-architect/ea-diagrams";

    import {selectedServiceKey, serviceStore} from "../../../stores/service";

    let serviceImgUrl = '';

    selectedServiceKey.subscribe(key => {
        if (key!='') {
            serviceImgUrl = getPlantUrl(createServiceInteractionView($serviceStore[key]));
        }
    })

</script>

<img src={serviceImgUrl}/>
