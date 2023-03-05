
<script>

    import { ServicesRepositoryGitHub } from "@electronic-architect/ea-services";
    import {serviceStore} from "../../../stores/service";

    let repo = new ServicesRepositoryGitHub({
        url: 'https://api.github.com',
        token: 'Bearer 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',
        owner: 'simonwfarrow',
        repo: 'ea-resources'
    });
    repo.getServices().then(services => {
       services.forEach(service => {
           $serviceStore = [...$serviceStore,service];
       })
    })

</script>

Service
