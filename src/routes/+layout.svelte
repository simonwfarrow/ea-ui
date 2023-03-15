<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/all.css';
    import "../app.css";

    import {onMount} from "svelte";
    import {ServicesRepositoryGitHub} from "@electronic-architect/ea-services/src/index";
    import {FlowRepositoryGitHub} from "@electronic-architect/ea-flows/src/index";
    import {getGitHubGraphQLConn} from "@electronic-architect/ea-content";
    import {serviceStore} from "../stores/service";
    import {flowStore} from "../stores/flow";
    import {LightSwitch} from "@skeletonlabs/skeleton";

    export let loadingMsg = 'Loading...'

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


</script>

<slot/>



