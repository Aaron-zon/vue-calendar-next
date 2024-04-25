import {computed, ref} from 'vue'
import { useLocale } from '@vue-calendar-next/hooks'

import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs'

const { t } = useLocale();

export type MonthTableProps = {
    date: Dayjs,
    // year: Dayjs
}

export const useMonthTable = (props: MonthTableProps) => {
    const MONTH_TABLE = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11]
    ]

    const monthTable = computed(() => {
        return MONTH_TABLE.map((row) => row.map((_) => {
            return {
                name: t(`vcn.datepicker.month[${_}]`),
                value: _
            }

        }))
    })

    const selectedMonth: Ref<Dayjs> = ref()

    const month = computed(() => {
        if (!selectedMonth.value) {
            setSelectedMonth(props.date)
        }

        return selectedMonth.value
    })

    const setSelectedMonth = (val: Dayjs) => {
        if (!val) return
        selectedMonth.value = val.startOf('month')
    }

    return {
        monthTable,
        month,
        setSelectedMonth
    }
}
