<script lang="ts">

    import {goto} from "$app/navigation";
    import ServiceTree from "../../components/ServiceTree.svelte";
</script>


<div class="drawer drawer-mobile" data-theme="light">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
        <slot/>

        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

    </div>
    <div class="drawer-side" data-theme="dark">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <div class="p-4">
            <ServiceTree/>
        </div>

    </div>
</div>
