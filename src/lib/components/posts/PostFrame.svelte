<script>
import BlogList from "./PostList.svelte";
    const {title, description,posts} = $props();
</script>
<div class="blog-frame">
    <h3 class="blog-title">{title}</h3>
    <p class="blog-description">{description}</p>
    <div class="divider"></div>
    <BlogList {posts} />
</div>

<style>
.blog-frame {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background: #1e293b99;
    border: 1px solid rgba(148, 163, 184, 0.1);
    margin-bottom: 1em;
}

h3{
    color: #f8fafc
}

p{
    font-size: 1.25rem;
    color: #e2e8f0;
    margin: 0;
    font-weight: 300;
    margin-top: 0.5em;
    margin-bottom: 1em;
}
</style>