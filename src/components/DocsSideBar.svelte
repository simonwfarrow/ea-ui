<script lang="ts">

    import {sankeyAlignment, sankeyData, sankeyLinkColour} from "../stores/docs/sankey-store";
    import {onMount} from "svelte";
    import {base} from "$app/paths";
    import * as d3 from "d3";

    let sanKeyAlignments = [{id: 1, text:"left"},{id: 2, text:"right"},{id: 3, text:"justify"}]
    let selectedAlignment = sanKeyAlignments[0];
    let linkColours = [{id:1, text: "source-target"},{id:2, text: "source"},{id:3, text: "target"}]
    let selectedColour = linkColours[0];
    let apis = [{id:1,text: "Current API", data:null},{id:2,text: "Target API", data:null}]
    let selectedAPI = apis[0];

    onMount(async () => {
        d3.json(`${base}/data/access.json`).then(res => {
            apis[0].data = res;
            selectedAPI = apis[0]
            sankeyData.set(selectedAPI.data);
        });
        d3.json(`${base}/data/access_2.json`).then(res => {
            apis[1].data = res;
        });

    })

    $:
      sankeyData.set(selectedAPI.data);

    function updateAlignment(alignment) {
        sankeyAlignment.set(alignment.text);
    }
    function updateColour(colour) {
        sankeyLinkColour.set(colour.text);
    }
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Settings</div>
    <!-- Navigation List -->
    <label class="label">
        <span>Alignment</span>
        <select bind:value={selectedAlignment}  on:change="{updateAlignment(selectedAlignment)}" class="select">
            {#each sanKeyAlignments as alignment}
                <option value={alignment}>{alignment.text}</option>
            {/each}
        </select>
    </label>
    <label class="label">
        <span>Link Colours</span>
        <select bind:value={selectedColour} on:change="{updateColour(selectedColour)}" class="select">
            {#each linkColours as colour}
                <option value={colour}>{colour.text}</option>
            {/each}
        </select>
    </label>
    <label class="label">
        <span>API</span>
        <select bind:value={selectedAPI}  class="select">
            {#each apis as api}
                <option value={api}>{api.text}</option>
            {/each}
        </select>
    </label>
</section>
