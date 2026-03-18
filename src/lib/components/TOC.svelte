<script>
  let {activeId='',headings = []} = $props();
</script>

<nav class="toc">
  <p class="toc-title">ON THIS PAGE</p>
  <ul>
    {#each headings as heading}
      <li class="level-{heading.depth}" class:active={activeId === heading.id}>
        <a href="#{heading.id}">{heading.value}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .toc {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }

  .toc-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  ul { list-style: none; padding: 0; margin: 0; border-left: 1px solid var(--border-color); }

  li { padding-left: 1rem; margin: 0.75rem 0; line-height: 1.2; }

  li.level-3 { padding-left: 2rem; font-size: 0.9rem; }

  a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
    display: block;
  }

  a:hover, .active a { color: var(--primary); }

  /* 高亮当前章节的左侧边框 */
  .active {
    border-left: 2px solid var(--primary);
    margin-left: -1px; /* 覆盖原边框 */
  }
</style>