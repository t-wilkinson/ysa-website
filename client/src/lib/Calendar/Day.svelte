<script lang="ts">
    export let day: number;
    export let type: 'previous' | 'current' | 'next';
    export let selectedDate: Date = undefined;
</script>

<style>
    .day {
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-align: center;
        line-height: 4rem;
    }

    .previous, .next {
        background-color: #ccc;
    }

    .current {
        background-color: #eee;
    }

    .selected {
        background-color: green;
    }
</style>

<div
     class="day {type}"
     class:selected={selectedDate?.getDate() === day}
     on:click={() => selectedDate = new Date(2022, 2, day)}
     >
     {day}
</div>

