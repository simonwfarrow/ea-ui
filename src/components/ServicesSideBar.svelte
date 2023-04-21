<script lang="ts">
    import {serviceStore} from "../stores/service";

</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Services</div>
    <!-- Navigation List -->
    <nav class="list-nav">
        <ul>
            {#each Object.entries($serviceStore) as [key,service]}
                <li>
                    <a href="/ea-ui/ea/view/services/{key}" data-sveltekit-preload-data="hover">
                        <span class="flex-auto">{key}</span>
                        <span class="badge variant-filled-secondary">{service.status}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</section>
