<script>
  export let title;
  export let value;
</script>

<div class="card variant-glass-primary p-4 shadow !text-white mb-4">
  <dl class="list-dl">
    <div>
      <span class="badge bg-primary-500">&nbsp;i&nbsp;</span>
      <span class="flex-auto">
          <dt><b>{title}</b></dt>
          <dd>{value}</dd>
		    </span>
    </div>
  </dl>
</div>
