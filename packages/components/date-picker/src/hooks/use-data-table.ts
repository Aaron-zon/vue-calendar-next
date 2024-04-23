import { computed } from 'vue'
import { useLocale } from '@vue-calendar-next/hooks'

const { t } = useLocale();

export const useDataTable = () => {
    const MONTH_TABLE = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ]

    const monthTable = computed(() => {
        return MONTH_TABLE.map((row) => row.map(_ => t(`vcn.datepicker.month[${_}]`)))
    })
    return {
        monthTable
    }
}
