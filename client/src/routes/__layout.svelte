<script>
	import '../app.css';

    const routes = [
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
    ]
</script>

<style>
    nav {
        width: 100%;
        padding: 1rem;
        background: #ccc;
        margin-bottom: 2rem;
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }

    ul {
        display: flex;
        gap: 1rem;
    }
</style>

<nav>
    <ul>
        {#each routes as route}
            <li>
                <a href={route.href}>{route.label}</a>
            </li>
        {/each}
    </ul>
</nav>

<slot />
