<script lang="ts">
    type Event = {
        name: string;
        description: string;
        start: string;
        duration: string;
    }
    export let events: Event[] = [];
</script>

<style>
    .events {
        display: grid;
        width: 100%;
        grid-template-rows: repeat(auto-fill, 4rem);
        grid-gap: 1rem;
    }

    .event {
        background-color: #eee;
        padding: 1rem;
    }
</style>

<div class="events">
{#each events as event}
    <div class="event">
        {event.name}
        {event.start}
        {event.description}
    </div>
{/each}
</div>
