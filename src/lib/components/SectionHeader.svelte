<script>
  let { station, title, subtitle } = $props();
</script>

<div class="section-header">
  {#if station}
    <span class="station-label">{station}</span>
  {/if}
  {#if title}
    <h1 class="title">{title}</h1>
  {/if}
  {#if subtitle}
    <p class="subtitle">{subtitle}</p>
  {/if}
</div>

<style>
  .section-header {
    margin-bottom: 60px;
    text-align: center;
  }

  .station-label {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(251, 191, 36, 0.15);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 20px;
    color: #fbbf24;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
  }

  .title {
    font-size: clamp(2.4rem, 6vw, 3.8rem);
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 16px;
    letter-spacing: 0.04em;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #e2e8f0;
    margin: 0;
    font-weight: 300;
  }
</style>
