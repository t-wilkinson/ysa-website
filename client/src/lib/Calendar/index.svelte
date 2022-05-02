<script lang="ts" context="module">
    type Calendar = {
        previousMonthDays: number[];
        currentMonthDays: number[];
        nextMonthDays: number[];
    };

    function getCalendar(month: number, year: number): Calendar {
        const previousMonth = new Date(year, month, 0)
        const currentMonth = new Date(year, month + 1, 0)
        const nextMonth = new Date(year, month + 1, 1)

        // Get days in current month
        const currentMonthDays = []
        for (let i = 1; i <= currentMonth.getDate(); i++) {
            currentMonthDays.push(i)
        }

        // Get days in previous month
        const previousMonthDays = []
        if (previousMonth.getDay() !== 6) {
            for (let i = 0; i <= previousMonth.getDay(); i++) {
                previousMonthDays.push(i + previousMonth.getDate() - previousMonth.getDay())
            }
        }

        // Get days in next month
        const nextMonthDays = []
        for (let i = 1; i <= 7 - nextMonth.getDay(); i++) {
            nextMonthDays.push(i)
        }

        // If we do not fill a 6x7 grid of days, add another week at the end of the calendar
        const fillsCalendar = (previousMonthDays.length + currentMonthDays.length + nextMonthDays.length) >= 6 * 7
        if (!fillsCalendar) {
            for (let i = 1; i <= 7; i++) {
                nextMonthDays.push(i + 7- nextMonth.getDay())
            }
        }

        return {previousMonthDays, currentMonthDays, nextMonthDays}
    }
</script>

<script lang="ts">
    import Day from "./Day.svelte"
    import Events from "$lib/Events/index.svelte"
    import { getEvents, getEventDays } from "$lib/Events/api.js"
    import { selectedDate } from './stores.js'

    let calendar: Calendar
    $: {
        calendar = getCalendar($selectedDate.month, $selectedDate.year)
    }

    let eventDays = []
    $: {
        getEventDays($selectedDate)
            .then(days => eventDays = days)
    }
</script>

<style>
    .calendar {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: min-content;
    }

    .month {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-weight: bold;
        font-size: 2em;
    }

    .week-days {
        display: grid;
        grid-template-columns: repeat(7, 4em);
        justify-items: center;
        grid-gap: 0.5rem;
    }

    .week-day {
        font-weight: bold;
        font-size: 0.8em;
    }

    .days {
        display: grid;
        grid-template-columns: repeat(7, 4em);
        grid-template-rows: repeat(6, 4em);
        justify-items: center;
        grid-gap: 0.5rem;
        padding: 1rem;
    }
</style>

<div class="calendar">
    <div class="month">
        <button on:click={() => selectedDate.decMonth()}>&lt;</button>
        {new Date($selectedDate.year, $selectedDate.month, $selectedDate.day).toLocaleString("en-US", {month: "long"})} {$selectedDate.year}
        <button on:click={() => selectedDate.incMonth()}>&gt;</button>
    </div>

    <div class="week-days">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
            <div class="week-day">
                {day}
            </div>
        {/each}
    </div>

    <div class="days">
        {#each calendar.previousMonthDays as day}
            <Day type="previous" {day} />
        {/each}

        {#each calendar.currentMonthDays as day}
            <Day type="current" {day} selectedDate={selectedDate}
                 {eventDays}
        />
        {/each}

        {#each calendar.nextMonthDays as day}
            <Day type="next" {day} />
        {/each}
    </div>

    {#await getEvents($selectedDate)}
        loading...
    {:then events}
        <Events {events} />
    {:catch error}
        {error}
    {/await}

</div>
