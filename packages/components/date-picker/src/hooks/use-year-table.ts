import { ref, computed, inject } from 'vue'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs'

export type YearTableProps = {
    date: Dayjs
    year: number
}

export const useYearTable = (props: YearTableProps) => {
    const yearCount: number = inject('yearCount')!
    const rowYearCount: number = inject('rowYearCount')!

    const yearTable = computed(() => {
        const result: number[][] = []
        const range = findRange(props.year)
        const yearArr: number[] = []

        for (let i = range[0]; i <= range[1]; i ++) {
            yearArr.push(i)
        }
        for (let i = 0; i < yearCount / rowYearCount; i ++) {
            result[i] = []
            result[i].push(...yearArr.slice(i * rowYearCount, (i + 1) * rowYearCount))
        }

        setYearRange(range)

        return result
    })

    function findRange(num: number): [number, number] {
        let start = dayjs().year() - rowYearCount;
        const rangeVal = yearCount - 1

        while (start > num) {
            start -= yearCount
        }

        while (start <= num) {
            const end = start + rangeVal;
            if (num >= start && num <= end) {
                return [start, end];
            }
            start += yearCount;
        }
    
        return [num - rangeVal, num];
    }
    
    const setYearRange = (range: [number, number]) => {
        const yearRange: Ref<number[]> = inject('yearRange')!
        yearRange.value[0] = range[0]
        yearRange.value[1] = range[1]
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