<script>
    import { page } from '$app/stores';
</script>

{#if $page.status === 401}
    <h1>Please log in to continue</h1>
    <a href="/login">Login Page</a>
{:else}
    <h1>{$page.status}: {$page.error?.message}</h1>
{/if}