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

export type Mode = Ref<0 | 1 | 2>

export const useDatePicker = (props: DatePickerProps, emit: Function) => {
    const useDateProp: useDateProps = () => {
        return {
            currentDate: props.modelValue,
        }
    }

    const { date, pickDay } = useDate(useDateProp(), emit)

    const year = ref(1970)
    const month = ref(0)

    onMounted(() => {
        year.value = date.value.year()
        month.value = date.value.month()
    })

    return {
        date,
        pickDay,
        year,
        month,
    }
}
