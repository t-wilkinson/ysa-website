<script context="module" lang="ts">
    import Day from "./Day.svelte"

    let selectedDate = new Date()

    function getCalendar(month: number, year: number) {
        const previousMonth = new Date(year, month, 0)
        const currentMonth = new Date(year, month + 1, 0)
        const nextMonth = new Date(year, month + 1, 1)

        // Get days in previous month
        const previousMonthDays = []
        for (let i = 1; i <= previousMonth.getDay() + 1; i++) {
            previousMonthDays.push(i + previousMonth.getDate() - 6 + 1 + previousMonth.getDay())
        }

        // Get days in current month
        const currentMonthDays = []
        for (let i = 1; i <= currentMonth.getDate(); i++) {
            currentMonthDays.push(i)
        }

        // Get days in next month
        const nextMonthDays = []
        for (let i = 1; i <= 7 - nextMonth.getDay(); i++) {
            nextMonthDays.push(i)
        }

        return {previousMonthDays, currentMonthDays, nextMonthDays}
    }

    const today = new Date()
    const calendar = getCalendar(today.getFullYear(), today.getMonth())
</script>

<style>
    .calendar {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .month {
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
        {today.toLocaleString("en-US", {month: "long"})} {today.getFullYear()}
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
            <Day type="current" {day} selectedDate={selectedDate} />
        {/each}

        {#each calendar.nextMonthDays as day}
            <Day type="next" {day} />
        {/each}
    </div>
</div>
