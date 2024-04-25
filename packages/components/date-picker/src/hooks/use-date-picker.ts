import { useDate } from '@vue-calendar-next/hooks'
import type { useDateProps } from '@vue-calendar-next/hooks'
import type { Dayjs } from 'dayjs'

export type DatePickerProps = {
    modelValue?: Dayjs
}

export const useDatePicker = (props: DatePickerProps, emit: Function) => {
    const useDateProp: useDateProps = () => {
        return {
            currentDate: props.modelValue,
        }
    }

    const { date, pickDay } = useDate(useDateProp(), emit)


    return {
        date,
        pickDay
    }
}
