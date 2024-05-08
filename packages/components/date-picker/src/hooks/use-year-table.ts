import { ref, computed, inject } from 'vue'

import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs'

export type YearTableProps = {
    date: Dayjs
    year: number
}

export const useYearTable = (props: YearTableProps) => {
    const yearCount = inject('yearCount')
    const rowYearCount = inject('rowYearCount')

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

        setYearRange(result[0][0], result[result.length - 1][result[result.length - 1].length - 1])
        
        return result
    })

    const setYearRange = (firstYear: number, lastYear: number) => {
        const yearRange: Ref<number[]> = inject('yearRange')!
        yearRange.value[0] = firstYear
        yearRange.value[1] = lastYear
    }


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