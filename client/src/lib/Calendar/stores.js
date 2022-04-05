import { writable } from "svelte/store"

function createSelectedDate() {
  const today = new Date()
  const { subscribe, set, update } = writable({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear()})

  return {
    subscribe,
    set,
    update,
    setDate: (day) => update((d) => ({ ...d, day })),

    incMonth: () => update((d) => {
      let month = d.month + 1
      let year = d.year
      if (month > 11) {
        month = 0
        year = year + 1
      }

      return {
        ...d,
        year,
        month,
        day: 1,
      }
    }),

    decMonth: () => update((d) => {
      let month = d.month - 1
      let year = d.year
      if (month < 0) {
        month = 11
        year = year - 1
      }

      return {
        ...d,
        year,
        month,
        day: 1,
      }
    }),
  }
}

export const selectedDate = createSelectedDate()

