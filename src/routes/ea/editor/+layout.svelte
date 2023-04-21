<script lang="ts">
    import {CodeBlock, Tab, TabGroup, focusTrap} from "@skeletonlabs/skeleton";
    import {serviceStore} from "../../../stores/service";
    import {onMount} from "svelte";
    import Fa from 'svelte-fa'
    import { faCirclePlus, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'
    import {Step, Actor, Interaction, FlowDescriptor} from "@electronic-architect/ea-flows/src/index";
    import jsYaml  from "js-yaml";

    import { getPlantUrl, createFlowSequenceView} from "@electronic-architect/ea-diagrams";


    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import FlowStepExplorer from "../../../components/FlowStepExplorer.svelte";
    import {flowStore, selectedFlowKey} from "../../../stores/flow";
    import {page} from "$app/stores";

    storeHighlightJs.set(hljs);

    let serviceSelect = [];
    let interactionSelect = [];
    let selectedInteraction;
    let selectedProducer;
    let selectedConsumer;
    let iIndex = 1;
    let flow;
    let stepDescription;
    let flowImgUrl = '';
    let flowPuml= '';
    let flowYaml = '';
    let editTabs  = 0;
    let imageTabs = 0;

    onMount(async () => {

        let sIndex = 1;

        for (const [sKey, service] of Object.entries($serviceStore)) {
            serviceSelect.push({id: sIndex++, text: sKey})
        }

        if ($page.params.slug!=null){
            flow = $flowStore[$page.params.slug];
        } else {
            //setup a new flow
            flow = new FlowDescriptor();
            flow.id = 'test';
            flow.name = 'test';
            flow.description = 'test';
            flow.steps = [];
        }

    })

    selectedFlowKey.subscribe(key => {
        console.log(key);
        flow = $flowStore.get(key);
    })

    $: {
        if (flow!=null) {
            render(flow);
        }
    }

    // when a user chooses a producer or consumer load the interactions into the interaction select array
    $: updateInteractions(selectedProducer, selectedConsumer)

    function updateInteractions(producer, consumer) {

        //looks complex, we are adding every interaction from the selected producer and consumers and their endpoints
        //we store the endpoint name, interaction name etc. in the object added to the select array so we can pull out later on
        interactionSelect = [];
        if (producer != null && consumer != null) {
            if ($serviceStore[producer.text].interactions != null) {
                for (const [iKey, interaction] of Object.entries($serviceStore[producer.text].interactions)) {
                    if (interaction.endpoints !=null) {
                        for (const [eKey, endpoint] of Object.entries(interaction.endpoints)){
                            interactionSelect.push({id: iIndex++, text: `Producer:${iKey}:${eKey}`, interaction: iKey, type: 'Producer', endpoint: eKey});
                        }
                    } else {
                        interactionSelect.push({id: iIndex++, text: `Producer:${iKey}`, interaction: iKey, type: 'Producer', endpoint: 'none'});
                    }

                }
            }
            if ($serviceStore[consumer.text].interactions != null) {
                for (const [iKey, interaction] of Object.entries($serviceStore[consumer.text].interactions)) {
                    if (interaction.endpoints !=null) {
                        for (const [eKey, endpoint] of Object.entries(interaction.endpoints)){
                            interactionSelect.push({id: iIndex++, text: `Consumer:${iKey}:${eKey}`, interaction: iKey, type: 'Consumer', endpoint: eKey});
                        }
                    } else {
                        interactionSelect.push({id: iIndex++, text: `Consumer:${iKey}`, interaction: iKey, type: 'Consumer', endpoint: 'none'});
                    }


                }
            }

        }
        interactionSelect = interactionSelect;

    }

    function addStep() {
        let step = new Step();
        step.sequence = 1;

        step.description = stepDescription;
        let producer = new Actor();
        producer.name = selectedProducer.text;
        producer.$ref = $serviceStore[selectedProducer.text]._path;
        step.producer = producer;
        let consumer = new Actor();
        consumer.name = selectedConsumer.text;
        consumer.$ref = $serviceStore[selectedConsumer.text]._path;
        step.consumer = consumer;

        if (selectedInteraction != null) {
            let interaction = new Interaction();
            if (selectedInteraction.type === 'Producer') {
                let service = $serviceStore[selectedProducer.text];
                let ref = service._path + `#/interactions/${selectedInteraction.interaction}`
                interaction.$ref = ref;
                interaction.endpoint = selectedInteraction.endpoint;
            } else {
                let service = $serviceStore[selectedConsumer.text];
                let ref = service._path + `#/interactions/${selectedInteraction.interaction}`
                interaction.$ref = ref;
                interaction.endpoint = selectedInteraction.endpoint;
            }
            step.interaction = interaction;
        }


        flow.steps.push(step);
        flow.steps = flow.steps; //force update of array so bound var also update

        render(flow)
    }

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
                    <input class="input p-1" type="text" bind:value={stepDescription}/>
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
                    <button class="btn variant-filled-primary" on:click={addStep}>
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

<slot/>
