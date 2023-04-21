<script lang="ts" xmlns:svelte="http://www.w3.org/1999/html">

    import {navStore} from "../../stores/navigation";
    import {AppBar, AppRail, AppRailTile, AppShell, LightSwitch} from "@skeletonlabs/skeleton";
    import {goto} from '$app/navigation';
    import Fa from 'svelte-fa'
    import { faServer, faDiagramProject, faMagnifyingGlass, faBrain, faFilePen } from '@fortawesome/free-solid-svg-icons'
    import Query from "../../components/QuerySideBar.svelte";
    import Flows from "../../components/FlowsSideBar.svelte";
    import Services from "../../components/ServicesSideBar.svelte";
    import EditorSideBar from "../../components/EditorSideBar.svelte";
    import {page} from "$app/stores";

    navStore.subscribe(path => {
        if ($page.params.slug!=null){
            goto(`ea-ui/ea/${path}/${$page.params.slug}`)
        } else {
            goto(`ea-ui/ea/${path}`)
        }

    })

</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelete:fragment slot="lead"><Fa icon={faBrain}/></svelete:fragment>
            <h3><span class="gradient-heading">Electronic Architect</span></h3>
            <svelete:fragment slot="trail"><LightSwitch /></svelete:fragment>
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <div class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ?? ''}">
            <AppRail selected={navStore}>
                <svelte:fragment slot="lead">
                    <!-- AppRailTiles -->
                </svelte:fragment>
                    <AppRailTile label="Services" title="Services" value={'view/services'}><Fa icon={faServer}/></AppRailTile>
                    <AppRailTile label="Flows" title="Flows" value={'view/flows'}><Fa icon={faDiagramProject}/></AppRailTile>
                    <AppRailTile label="Query" title="Query" value={'query'}><Fa icon={faMagnifyingGlass}/></AppRailTile>
                    <AppRailTile label="Editor" title="Editor" value={'editor'}><Fa icon={faFilePen}/></AppRailTile>
                <svelte:fragment slot="trail">
                    <!-- AppRailTiles -->
                </svelte:fragment>
            </AppRail>
            <!-- Nav Links -->
            {#if $navStore == 'view/services'}
                <Services/>
            {/if}
            {#if $navStore == 'view/flows'}
                <Flows/>
            {/if}
            {#if $navStore == 'query'}
                <Query/>
            {/if}
            {#if $navStore == 'editor'}
                <EditorSideBar/>
            {/if}
        </div>
    </svelte:fragment>
    <svelte:fragment slot="sidebarRight"></svelte:fragment>
    <svelte:fragment slot="pageHeader"></svelte:fragment>
    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
    <svelte:fragment slot="pageFooter"></svelte:fragment>
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
