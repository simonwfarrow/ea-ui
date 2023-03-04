
<script>

    import { ServiceDescriptor, ServicesRepositoryGitHub } from "@electronic-architect/ea-services";

    let repo = new ServicesRepositoryGitHub();
    repo.getServices({
        url: 'https://api.github.com',
        token: 'Bearer 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',
        owner: 'simonwfarrow',
        repo: 'ea-resources'
    }).then(services => {
       services.forEach(service => {
           console.log(service.name);
       })
    })

</script>

Service
