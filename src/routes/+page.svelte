<script lang="ts">

    import { goto } from '$app/navigation';
    import {onMount} from "svelte";
    import {ServicesRepositoryGitHub} from "@electronic-architect/ea-services";
    import {FlowRepositoryGitHub} from "@electronic-architect/ea-flows";
    import {getGitHubGraphQLConn} from "@electronic-architect/ea-content";
    import {serviceStore} from "../stores/service";
    import {flowStore} from "../stores/flow";
    import {LightSwitch} from "@skeletonlabs/skeleton";

    let loadingMsg = 'Loading...'

    onMount(async () => {
        loadingMsg = 'Connecting to GitHub...'
        let conn = getGitHubGraphQLConn('https://github.worldpay.com/api' ,`Bearer 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`);
        const config = {
            connection: conn,
            owner: 'access-for-ecom-doc',
            repo: 'electronic-architect'
        };
        loadingMsg = 'Loading service resources...'
        const serviceRepo = new ServicesRepositoryGitHub();
        serviceRepo.getServices(config).then(services => {
            services.forEach(service => {
                loadingMsg = `Loading ${service.name}`
                $serviceStore[service.name] = service;
            })
            loadingMsg = 'Ready'
        })
        loadingMsg = 'Loading flow resources...'
        const flowRepo = new FlowRepositoryGitHub();
        flowRepo.getFlows(config).then(flows => {
            flows.forEach(flow => {
                loadingMsg = `Loading ${flow.name}`
                $flowStore[flow.id] = flow;
            })
            loadingMsg = 'Ready'
        })
    })

    function start() {
        goto('ea')
    }

</script>


<div class="container mx-auto">
    <div class="grid h-screen place-items-center">
        <a href="ea" class="card card-hover overflow-hidden" style="cursor: pointer">
            <!-- Header -->
            <header>
                <div class="flex justify-center">
                    <img src="/images/ea.jpg" class="max-w-sm rounded-lg shadow-2xl" />
                </div>
            </header>
            <!-- Body -->
            <div class="p-4 space-y-4">
                <h6 class="text-primary-500">{loadingMsg}</h6>
                <h3>Electronic Architect</h3>
            </div>

        </a>
    </div>
</div>


