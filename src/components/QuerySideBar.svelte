<script lang="ts">
    import {InputChip} from "@skeletonlabs/skeleton";
    let queryList = [];
    import Fa from 'svelte-fa'
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

    function search(){

    }
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Query</div>
    <!-- Navigation List -->
    <InputChip name="query" bind:value={queryList}/>
    <button class="btn-icon variant-filled-primary" on:click={search}><Fa icon={faMagnifyingGlass}/></button>
</section>
