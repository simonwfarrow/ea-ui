<script lang="ts">
    import {CodeBlock, Tab, TabGroup, focusTrap} from "@skeletonlabs/skeleton";

    import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
    import {FlowDescriptor} from "@electronic-architect/ea-flows/src/index";
    import Fa from "svelte-fa";
    import {onMount} from "svelte";
    import {serviceStore} from "../stores/service";
    import jsYaml from "js-yaml";
    import { getPlantUrl, createFlowSequenceView} from "@electronic-architect/ea-diagrams";
    import FlowStepExplorer from "./FlowStepExplorer.svelte";

    export let flow: FlowDescriptor;

    let selectedProducer;
    let selectedConsumer;
    let serviceSelect = [];
    let interactionSelect = [];
    let selectedInteraction;
    let editTabs  = 0;
    let flowImgUrl = '';

    let imageTabs = 0;
    let flowPuml= '';
    let flowYaml = '';

    $:
      if (flow!=null) {render(flow);}


    function render(flow){

        let services= [];
        for (const [key, service] of Object.entries($serviceStore)) {
            services.push(service);
        }
        createFlowSequenceView(flow,services).then(flow => {
            flowPuml = flow;
            flowImgUrl = getPlantUrl(flow);

        });

        flowYaml = jsYaml.dump(flow);
    }

</script>

<div class="flex flex-col h-full">
    <div class="flex grid-cols-2 max-h-1/3">
        <div class="card p-4 m-4 w-full max-h-96">
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4" use:focusTrap={true}>

                <label class="label col-span-2">
                    <span>Description</span>
                    <input class="input p-1" type="text"/>
                </label>
                <label class="label">
                    <span>Producer</span>
                    <select bind:value={selectedProducer}  class="select">
                        {#each serviceSelect as service}
                            <option value={service}>{service.text}</option>
                        {/each}
                    </select>
                </label>
                <label class="label">
                    <span>Consumer</span>
                    <select bind:value={selectedConsumer} class="select">
                        {#each serviceSelect as service}
                            <option value={service}>{service.text}</option>
                        {/each}
                    </select>
                </label>
                <label class="label">
                    <span>Interaction</span>
                    <select bind:value={selectedInteraction} class="select">
                        {#each interactionSelect as interaction}
                            <option value={interaction}>{interaction.text}</option>
                        {/each}
                    </select>
                </label>
                <label class="label">
                    <button class="btn variant-filled-primary">
                        <span>Add Step</span>
                        <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCirclePlus}/></span>
                    </button>
                </label>
            </div>
        </div>
        <div class="card p-4 m-4 w-full overflow-auto max-h-96">
            <TabGroup>
                <Tab bind:group={editTabs} name="tab1" value={0}>Yaml</Tab>
                <Tab bind:group={editTabs} name="tab2" value={1}>Puml</Tab>
                <Tab bind:group={editTabs} name="tab2" value={2}>Steps</Tab>
                <!-- Tab Panels --->
                <svelte:fragment slot="panel">
                    {#if editTabs === 0}
                        <CodeBlock language="yml" code={flowYaml} />
                    {:else if editTabs === 1}
                        <CodeBlock language="md" code={flowPuml} />
                    {:else if editTabs === 2}
                        <FlowStepExplorer bind:steps={flow.steps}/>
                    {/if}
                </svelte:fragment>
            </TabGroup>

        </div>
    </div>
    <div class="card p-4 m-4 h-2/3 overflow-auto" >
        <TabGroup>
            <Tab bind:group={imageTabs} name="tab1" value={0}>Context</Tab>
            <Tab bind:group={imageTabs} name="tab2" value={1}>Sequence</Tab>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if imageTabs === 0}
                    <div class="p-4 space-y-4">
                        <figure class="flex justify-center"><img src={flowImgUrl}/></figure>
                    </div>
                {:else if imageTabs === 1}
                    <div class="p-4 space-y-4">
                        <figure class="flex justify-center"><img src={flowImgUrl}/></figure>
                    </div>
                {/if}
            </svelte:fragment>
        </TabGroup>

    </div>
</div>
