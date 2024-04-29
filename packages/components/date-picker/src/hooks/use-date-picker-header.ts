import { computed } from 'vue'
import { useLocale } from '@vue-calendar-next/hooks'

import { MODE_0, MODE_1, MODE_2 } from './use-date-picker'
import type { Dayjs } from 'dayjs'

const { t } = useLocale()


export type DatePickerHeaderProps = {
    mode: number
    date: Dayjs
    year: number
    month: number
}

export const useDatePickerHeader = (props: DatePickerHeaderProps, emit: Function) => {
    const yearText = computed(() => {
        let result: string = ''
        switch (props.mode) {
            case 0: // date
                result = props.year.toString()
                break
            case 1: // month
                result = props.year.toString()
                break
            case 2: // year
                result = `${props.year.toString()}`
                break
        }
        return result
    })

    const monthText = computed(() => {
        let result: string = ''
        if (props.mode === 0) {
            result = t(`vcn.datepicker.month.${props.month}`)
        }
        return result
    })

    const yearSearch = () => {
        if (props.mode !== MODE_2) emit('changeMode', MODE_2)
    }

    const monthSearch = () => {
        if (props.mode === MODE_0) emit('changeMode', MODE_1)
    }

    const arrowLeftClick = () => {

    }

    const arrowRightClick = () => {

    }

    const dArrowLeftClick = () => {
        if (props.mode === MODE_1) {
            emit('changeYear', props.year - 1)
        }

    }

    const dArrowRightClick = () => {
        if (props.mode === MODE_1) {
            emit('changeYear', props.year + 1)
        }
    }

    return {
        yearText,
        monthText,
        yearSearch,
        monthSearch,
        arrowLeftClick,
        arrowRightClick,
        dArrowLeftClick,
        dArrowRightClick,
    }
}