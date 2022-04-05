<script lang="ts">
	export let day: number;
	export let type: 'previous' | 'current' | 'next';
	/* export let selectedDate: { day: number; month: number; year: number } = undefined; */
	export let selectedDate = undefined;
</script>

<div
	class="day {type}"
	class:selected={$selectedDate?.day === day}
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
	}

	.previous,
	.next {
		background-color: #ccc;
	}

	.current {
		background-color: #eee;
	}

	.selected {
		background-color: green;
	}
</style>
