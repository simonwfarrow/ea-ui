<script lang="ts">
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/all.css';
    import "../app.css";
    import "../define_self.js";
    import "whatwg-fetch";

    import {onMount} from "svelte";
    import {ServicesRepositoryGitHub, ServiceRepositoryLocal} from "@electronic-architect/ea-services/src/index";
    import {FlowRepositoryGitHub} from "@electronic-architect/ea-flows/src/index";
    import {getGitHubGraphQLConn} from "@electronic-architect/ea-content";
    import {serviceStore} from "../stores/service";
    import {flowStore} from "../stores/flow";

    onMount(async () => {


        /*const serviceRepo = new ServiceRepositoryLocal();
        serviceRepo.getServices({path: '/Users/e5591703/Projects/electronic-architect/resources'}).then(services => {
            services.forEach(service => {
                console.log(service);
                $serviceStore[service.name] = service;
            })
        })*/

        let conn = getGitHubGraphQLConn('https://github.worldpay.com/api' ,`Bearer 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`);
        const config = {
            connection: conn,
            owner: 'access-for-ecom-doc',
            repo: 'electronic-architect'
        };

        const serviceRepo = new ServicesRepositoryGitHub();
        serviceRepo.getServices(config).then(services => {
            services.forEach(service => {
                $serviceStore[service.name] = service;
            })
        })

        const flowRepo = new FlowRepositoryGitHub();
        flowRepo.getFlows(config).then(flows => {
            flows.forEach(flow => {
                $flowStore[flow.id] = flow;
            })
        })



    })


</script>

<slot/>



