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
  import { derived, writable } from 'svelte/store';
  import MiStat from '../../../components/MiStat.svelte';

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

  const allADRs = writable([]);

  class ADR {
    title: string;
    state: string;
    createdAtUTC: Date;
    closedAtUTC: Date;
    isOpen: boolean;
    isClosed: boolean;
    ttrInDays: number = 0;
    milestone: string;
    isIdentified:boolean;
    isProposed:boolean;
    isAccepted: boolean;
    isBeingProved: boolean;
    isAdopted: boolean;
    isRejected: boolean;

    constructor(dto) {
      this.title = dto.title;
      this.state = dto.state;
      this.createdAtUTC = new Date(dto.created_at);
      this.closedAtUTC = new Date(dto.closed_at);
      this.isOpen = this.state === 'open';
      this.isClosed = this.state === 'closed';
      this.ttrInDays = this.calculateTimeToResolutionInDays();
      this.milestone = dto.milestone ? dto.milestone.title : '';
      this.isIdentified = this.milestone === 'Identified';
      this.isProposed = this.milestone === 'Proposed';
      this.isAccepted = this.milestone === 'Accepted';
      this.isBeingProved = this.milestone === 'Prove';
      this.isAdopted = this.milestone === 'Adopted';
      this.isRejected = this.milestone === 'Rejected';
    }

    calculateTimeToResolutionInDays(): number {
      if (this.isOpen) {
        return 0;
      }
      return (this.closedAtUTC.getTime() - this.createdAtUTC.getTime()) / (24 * 3600 * 1000);
    }
  }

  const openADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isOpen).length;
  });

  const closedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isClosed).length;
  });

  const identifiedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isIdentified).length;
  });

  const proposedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isProposed).length;
  });

  const acceptedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isAccepted).length;
  });

  const provingADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isBeingProved).length;
  });

  const adoptedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isAdopted).length;
  });

  const rejectedADRs = derived(allADRs, ($allADRs) => {
    return $allADRs.filter(adr => adr.isRejected).length;
  });

  const meanTimeToResolution = derived(allADRs, ($allADRs) => {
    const closedADRs = $allADRs.filter(adr => adr.isClosed);
    if (closedADRs.length === 0) {
      return 0;
    }
    return Math.round(closedADRs.reduce((total, adr) => total + adr.ttrInDays, 0) / closedADRs.length);
  });

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


