<script lang="ts">
  import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    Title,
    Tooltip,
  } from 'chart.js';
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';
  import MiStat from '../../../components/MiStat.svelte';
  import { allADRs } from '../../../stores/mi/mi-store';
  import ADR from '../../../stores/mi/adr';
  import {
    openADRs,
    closedADRs,
    meanTimeToResolution,
    acceptedADRs,
    adoptedADRs,
    identifiedADRs,
    proposedADRs,
    provingADRs,
    rejectedADRs,
  } from '../../../stores/mi/mi-store';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Colors);

  const BEARER_TOKEN = '';
  const apiBaseUrl = 'https://github.worldpay.com/api/v3/repos/access-for-ecom-doc/adrs';
  const apiHeaders = {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
  };
  let ctx;
  let chartCanvas;


  function mountPieChart() {
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    };

    new Chart(chartCanvas.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Identified', 'Proposed', 'Accepted', 'Being proved', 'Adopted', 'Rejected'],
        datasets: [
          {
            label: ' Number ADRs ',
            data: [$identifiedADRs, $proposedADRs, $acceptedADRs, $provingADRs, $adoptedADRs, $rejectedADRs],
          },
        ],
      },
      options: chartOptions,
    });
  }

  onMount(async () => {
    const searchFor = 'all';
    const pageSize = 100;

    const response = await fetch(`${apiBaseUrl}/issues?state=${searchFor}&per_page=${pageSize}`, apiHeaders);
    const issuesExcludingPRs = (await response.json())
      .filter(issue => issue.pull_request === undefined);

    allADRs.set(issuesExcludingPRs.map(dto => new ADR(dto)));

    mountPieChart();
  });
</script>


<style>
  .col {
    width: 50%;
    float: left;
  }
</style>

<div class="p-4">
  <div class="col">
    <MiStat title="Number of ADRs currently open" value={$openADRs} />
    <MiStat title="Number of ADRs identified" value={$identifiedADRs} />
    <MiStat title="Number of ADRs proposed" value={$proposedADRs} />
    <MiStat title="Number of ADRs accepted" value={$acceptedADRs} />
    <MiStat title="Number of ADRs being proved" value={$provingADRs} />
    <MiStat title="Number of ADRs adopted" value={$adoptedADRs} />
    <MiStat title="Number of ADRs rejected" value={$rejectedADRs} />
    <MiStat title={`Mean Time To Resolution`}
            value={`${$meanTimeToResolution} days (${$closedADRs} ADRs closed)`} />
  </div>
  <div class="col pl-20 pr-20">
    <canvas bind:this={chartCanvas} id="myChart" />
  </div>
</div>


<!--{#each $allADRs as adr}-->
<!--  <MiStat title={`${adr.title} (${adr.milestone})`} value={0} />-->
<!--{/each}-->


