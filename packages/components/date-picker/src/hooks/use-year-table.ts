import { ref, computed } from 'vue'

import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs'

export type YearTableProps = {
    date: Dayjs
    year: number
}

export const useYearTable = (props: YearTableProps) => {
    const yearCount = 12
    const rowYearCount = 4

    const yearTable = computed(() => {
        const result: number[][] = []

        const year = props.year
        const forward = 2
        const prevYear = Math.floor(yearCount / 2) - forward
        const nextYear = prevYear + yearCount % 2 + forward * 2
        const yearArr: number[] = []

        for (let i = prevYear; i > 0; i -- ) {
            yearArr.push(year - i)
        }
        for (let i = 0; i < nextYear; i ++) {
            yearArr.push(year + i)
        }

        for (let i = 0; i < yearCount / rowYearCount; i ++) {
            result[i] = []
            result[i].push(...yearArr.slice(i * rowYearCount, (i + 1) * rowYearCount))
        }

        return result
    })

    const selectedYear: Ref<number | null> = ref(null)

    const year = computed(() => {
        if (!selectedYear.value) {
            setSelectedYear(props.date.year())
        }
        return selectedYear.value
    })

    const setSelectedYear = (val: number) => {
        if (!val) return
        selectedYear.value = val
    }

    return {
        yearTable,
        year,
        setSelectedYear
    }
}