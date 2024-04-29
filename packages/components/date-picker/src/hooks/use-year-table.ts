import { computed } from 'vue'

export type YearTableProps = {
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

    return {
        yearTable
    }
}