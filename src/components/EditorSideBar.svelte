<script lang="ts">
    import Fa from 'svelte-fa'
    import { faCirclePlus, faFileCirclePlus, faCloudArrowUp, faCloudArrowDown} from '@fortawesome/free-solid-svg-icons'

</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">

    <!-- Title -->
    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Steps</div>
    <!-- Navigation List -->
    <div class="grid grid-cols-1 gap-4 text-center text-xs font-bold">
        <button class="btn variant-filled">
            <span>New Step</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCirclePlus}/></span>
        </button>
        <button class="btn variant-filled">
            <span>New Reference</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faFileCirclePlus}/></span>
        </button>

    </div>

    <div  class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">Commands</div>
    <!-- Navigation List -->
    <div class="grid grid-cols-1 gap-4 text-center text-xs font-bold">
        <button class="btn variant-filled">
            <span>Load Flow</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCloudArrowDown}/></span>
        </button>
        <button class="btn variant-filled">
            <span>Save Flow</span>
            <span class="badge bg-white/10 dark:bg-black/10"><Fa icon={faCloudArrowUp}/></span>
        </button>

    </div>

</section>

