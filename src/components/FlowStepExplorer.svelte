<script lang="ts">
    import {flip} from 'svelte/animate';
    import { faArrowRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
    import Fa from "svelte-fa";
    import {Step} from "@electronic-architect/ea-flows";

    export let steps: Step[];
    let currentSteps: Step[] = steps.slice();
    let previousStepIndex = 0;
    let stepNav = [];
    let hovering = false;


    const drop = (event, target) => {
        event.dataTransfer.dropEffect = 'move';
        const start = parseInt(event.dataTransfer.getData("text/plain"));
        const newOrder = currentSteps;

        if (start < target) {
            newOrder.splice(target + 1, 0, newOrder[start]);
            newOrder.splice(start, 1);
        } else {
            newOrder.splice(target, 0, newOrder[start]);
            newOrder.splice(start + 1, 1);
        }
        currentSteps = newOrder
        hovering = null
    }

    const dragstart = (event, i) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        const start = i;
        event.dataTransfer.setData('text/plain', start);
    }

    function deleteStep(index) {
        currentSteps = currentSteps.splice(index,1);
        steps = currentSteps;
    }

    function open(step,index) {
        if (step.steps.length > 0) {
            currentSteps = step.steps;
            previousStepIndex = index;
            console.log(step);
            console.log(previousStepIndex);
            stepNav.push(step.steps[0].sequence+':'+step.steps[0].description);
            stepNav = stepNav;
        }
    }

    function navigateStep(index){
        currentSteps = currentSteps[previousStepIndex].steps;
        stepNav = stepNav.slice(index);
        console.log(currentSteps);
    }

</script>

<div>
    <ol class="list">
        {#each currentSteps as step, index (index) }
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
                <span class="flex-auto">{step.producer.name}<Fa style="display: inline" icon={faArrowRight}/>{step.consumer.name} : {step.description}</span>
                <span on:click={open(step, index)} on:keydown style="cursor: pointer"><Fa icon={faPlus}/></span>
                <span on:click={deleteStep(index)} on:keydown style="cursor:pointer;"><Fa icon={faTrash}/></span>

            </li>
        {/each}
    </ol>
</div>

