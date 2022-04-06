<script lang="ts">
	export let day: number;
	export let type: 'previous' | 'current' | 'next';
	export let selectedDate = undefined;
    export let eventDays: number[] = [];
</script>

<div
	class="day {type}"
    class:has-event={eventDays.includes(day)}
	class:is-selected={$selectedDate?.day === day}
	on:click={() => selectedDate?.setDate(day)}
 >
	{day}
</div>

<style>
	.day {
		width: 100%;
		height: 100%;
		cursor: pointer;
		text-align: center;
		line-height: 4rem;
        position: relative;
	}

    .has-event::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;

        margin-top: 0.25rem;
        margin-right: 0.25rem;
        width: 1rem;
        height: 1rem;

        border-radius: 100%;
        background-color: red;
    }

	.previous,
	.next {
		background-color: #ccc;
	}

	.current {
		background-color: #eee;
	}

	.is-selected {
		background-color: green;
	}
</style>
