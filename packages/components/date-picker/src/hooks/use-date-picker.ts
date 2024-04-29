import { onMounted, ref } from 'vue'
import { useDate } from '@vue-calendar-next/hooks'

import type { Ref } from 'vue'
import type { useDateProps } from '@vue-calendar-next/hooks'
import type { Dayjs } from 'dayjs'

export type DatePickerProps = {
    modelValue?: Dayjs
}

export const MODE_0 = 0
export const MODE_1 = 1
export const MODE_2 = 2

export type Mode = Ref<number>

export const useDatePicker = (props: DatePickerProps, emit: Function) => {
    const useDateProp: useDateProps = () => {
        return {
            currentDate: props.modelValue,
        }
    }

    const { date, pickDay } = useDate(useDateProp(), emit)

    const mode: Mode = ref(MODE_1)
    const year = ref(1970)
    const month = ref(0)

    const changeMode = (modeVal: number) => {
        mode.value = modeVal
    }

    const changeYear = (yearVal: number) => {
        year.value = yearVal
    }

    const selectedMonth = ({date, month}) => {
        emit('selectedMonth', { date, month })
    }

    onMounted(() => {
        year.value = date.value.year()
        month.value = date.value.month()
    })

    return {
        mode,
        date,
        pickDay,
        year,
        month,
        changeMode,
        changeYear,
        selectedMonth,
    }
}
