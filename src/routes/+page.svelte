<script>

    import { goto } from '$app/navigation';

    import { Octokit, App } from "octokit";

    const pat = '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';

    function start() {

        const octokit = new Octokit({auth: pat});

        async function auth() {
            const {
                data: {login},
            } = await octokit.rest.users.getAuthenticated();
            console.log("Hello, %s", login);
            goto('/ea');
        }
        auth();
    }

</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
        <img src="/images/ea.jpg" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
            <h1 class="text-5xl font-bold">Electronic Architect</h1>
            <p class="py-6">The Electronic Architect </p>
            <button class="btn btn-primary" on:click={start}>Get Started</button>
        </div>
    </div>
</div>

