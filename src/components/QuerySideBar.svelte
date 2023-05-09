<script lang="ts">
    import {InputChip} from "@skeletonlabs/skeleton";
    import Fa from 'svelte-fa'
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
    import { queryTerms } from '../stores/query/query-store.js';

    function search(){

    }
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Query</div>
    <!-- Navigation List -->
    <InputChip name="query" bind:value={$queryTerms}/>
    <button class="btn-icon variant-filled-primary" on:click={search}><Fa icon={faMagnifyingGlass}/></button>
</section>
