<script>

    import {goto} from "$app/navigation";
    import {TreeBranch, TreeLeaf, TreeView} from "svelte-tree-view-component";
    import {serviceStore} from "../../stores/service";

    function nav(){
        goto('ea/services')
    }

</script>


<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
        <slot/>

        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

    </div>
    <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <TreeView >
            <TreeBranch rootContent="Services">
                {#each $serviceStore as service}
                    <TreeLeaf>
                        {service.name}
                    </TreeLeaf>
                {/each}
            </TreeBranch>
            <TreeBranch rootContent="Frameworks">
                <TreeLeaf>Svelte</TreeLeaf>
                <TreeLeaf>React</TreeLeaf>
            </TreeBranch>
        </TreeView>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
            <li><a on:click={nav}>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
        </ul>

    </div>
</div>
