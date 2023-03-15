<script lang="ts">
    import {flip} from 'svelte/animate';
    import {FlowDescriptor} from "@electronic-architect/ea-flows";
    import { faArrowRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
    import Fa from "svelte-fa";
    import {createEventDispatcher} from "svelte";
    import {Step} from "@electronic-architect/ea-flows";

    export let flow: FlowDescriptor;
    export let currentStep: Step;

    let hovering = false;
    const dispatch = createEventDispatcher();


    const drop = (event, target) => {
        event.dataTransfer.dropEffect = 'move';
        const start = parseInt(event.dataTransfer.getData("text/plain"));
        const newOrder = flow.steps;

        if (start < target) {
            newOrder.splice(target + 1, 0, newOrder[start]);
            newOrder.splice(start, 1);
        } else {
            newOrder.splice(target, 0, newOrder[start]);
            newOrder.splice(start + 1, 1);
        }
        flow.steps = newOrder
        hovering = null
    }

    const dragstart = (event, i) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        const start = i;
        event.dataTransfer.setData('text/plain', start);
    }

    function deleteStep(index) {
        flow.steps.splice(index,1);
        flow.steps = flow.steps;
        dispatch('stepsUpdated', {});
    }

    function addSubStep(step) {
    }

</script>

<div>
    <ol class="breadcrumb">
        <li class="crumb"><a href="/elements/breadcrumbs">Skeleton</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/elements/breadcrumbs">Elements</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Breadcrumbs</li>
    </ol>
    <ol class="list">
        {#each flow.steps as step, index (index) }
            <li
                    style="cursor: grab"
                    class="list-item"
                    animate:flip
                    draggable={true}
                    on:dragstart={event => dragstart(event, index)}
                    on:drop|preventDefault={event => drop(event, index)}
                    ondragover="return false"
                    on:dragenter={() => hovering = index}
                    class:is-active={hovering === index}>
                <span class="badge-icon p-4 variant-soft-primary">{index+1}</span>
                <span class="flex-auto">{step.producer.name}<Fa style="display: inline" icon={faArrowRight}/>{step.consumer.name}</span>
                <span on:click={addSubStep(step)} style="cursor: pointer"><Fa icon={faPlus}/></span>
                <span on:click={deleteStep(index)} style="cursor:pointer;"><Fa icon={faTrash}/></span>

            </li>
        {/each}
    </ol>
</div>

