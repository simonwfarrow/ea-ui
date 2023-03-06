<script lang="ts">

    import { goto } from '$app/navigation';
    import {onMount} from "svelte";
    import { ServicesRepositoryGitHub } from "@electronic-architect/ea-services";
    import {serviceStore} from "../stores/service";

    let loadingMsg = 'Loading...'

    onMount(async () => {
        loadingMsg = 'Connecting to GitHub...'
        let repo = new ServicesRepositoryGitHub({
            url: 'https://api.github.com',
            token: 'Bearer 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',
            owner: 'simonwfarrow',
            repo: 'ea-resources'
        });
        repo.getServices().then(services => {
            loadingMsg = 'Loading resources...'
            services.forEach(service => {
                $serviceStore[service.name] = service;
            })
            loadingMsg = 'Ready'
        })
    })

    function start() {
        goto('ea/services')
    }

</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
        <img src="/images/ea.jpg" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
            <h1 class="text-5xl font-bold">Electronic Architect</h1>
            <p class="py-6">{loadingMsg}</p>
            <progress class="progress progress-info w-56"></progress>
            <button class="btn btn-primary" on:click={start}>Get Started</button>
        </div>
    </div>
</div>

