<script lang="ts">
    import {TreeBranch, TreeLeaf, TreeView} from "svelte-tree-view-component";
    import {serviceStore, selectedServiceKey} from "../stores/service";

    function setSelectedService(key: string) {
        selectedServiceKey.set(key);
    }
</script>


<TreeView >
    <TreeBranch rootContent="Platforms">
        <TreeBranch rootContent="AWPG" defaultClosed=true>
            <TreeBranch rootContent="Services" defaultClosed=true>
                {#each Object.entries($serviceStore) as [key,service]}
                    <TreeBranch rootContent="{key}" defaultClosed=true>
                        <TreeLeaf>
                            <div style="cursor: pointer;" on:click={setSelectedService(key)}>Diagram</div>
                        </TreeLeaf>
                        <TreeBranch rootContent="Interactions" defaultClosed=true>

                            {#if service.interactions != null}
                                {#each Object.entries(service.interactions) as [key,interaction]}
                                    <TreeLeaf>
                                        {interaction.name}
                                    </TreeLeaf>
                                {/each}
                            {/if}
                        </TreeBranch>
                    </TreeBranch>
                {/each}
            </TreeBranch>
        </TreeBranch>
    </TreeBranch>

</TreeView>
