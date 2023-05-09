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
    let flow: FlowDescriptor;
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
            selectedFlowKey.set($page.params.slug);
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


