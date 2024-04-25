import {computed, ref, Ref} from 'vue'
import dayjs from 'dayjs'
import { useLocale } from "./use-locale";

import type { ComputedRef } from 'vue'
import type { Dayjs } from 'dayjs'

export type useDateProps = {
    currentDate?: Date | string | Dayjs
    range?: Date[] | string[] | Dayjs[]
}

const { lang } = useLocale()
const now = dayjs().locale(lang.value)
export const useDate = (props: useDateProps, emit: Function) => {
    const selectedDay: Ref<Dayjs> = ref()

    /**
     * The current date
     */
    const date: ComputedRef<Dayjs> = computed(() => {
        if (!props.currentDate) {
            return realSelectedDay.value || (validatedRange.value.length ? validatedRange.value[0][0] : now)
        } else {
            return dayjs(props.currentDate).locale(lang.value)
        }
    })

    /**
     * The selected day
     */
    const realSelectedDay = computed({
        get(): Dayjs {
            if (!props.currentDate) return selectedDay.value
            return date.value
        },
        set(val: Dayjs) {
            if (!val) return
            selectedDay.value = val
            const result = val.toDate()
            emit('input', result)
            emit('update:modelValue', result)
        }

    })

    /**
     * The range of the selected day
     */
    const validatedRange = computed(() => {
        if (!props.range) return []

        const rangeArrDayjs = props.range.map((_) => dayjs(_).locale(lang.value))
        const [startDayjs, endDayjs] = rangeArrDayjs

        // start time should be less than end time
        if (startDayjs.isAfter(endDayjs)) {
            console.warn('end time should be greater than start time')
            return []
        }

        // start time and end time in the same month
        if (startDayjs.isSame(endDayjs, 'month')) {
            return calculateValidatedDateRange(startDayjs, endDayjs)
        } else { // start time and end time in different months
            if (startDayjs.add(1, 'month').month() != endDayjs.month()) {
                console.warn('start time and end time interval must not exceed two months')
                return []
            }
            // start time and end time in different months
            return calculateValidatedDateRange(startDayjs, endDayjs)
        }
    })

    /**
     * Calculate the range of the selected day
     * @param startDayjs
     * @param endDayjs
     * @returns
     */
    const calculateValidatedDateRange = (startDayjs: Dayjs, endDayjs: Dayjs) => {
        const firstDay = startDayjs.startOf('week')
        const lastDay = endDayjs.endOf('week')
        const firstMonth = firstDay.get('month')
        const lastMonth = lastDay.get('month')

        if (firstMonth === lastMonth) { // the same month
            return [[firstDay, lastDay]]
        }
        else if ((firstMonth + 1) % 12 === lastMonth) { // the date range spans two months
            return adjacentMonth(firstDay, lastDay)
        }
        else if (firstMonth + 2 === lastMonth || (firstMonth + 1) % 11 === lastMonth) { // the date range spans three months
            return threeConsecutiveMonth(firstDay, lastDay)
        } else {
            console.warn('start time and end time interval must not exceed two months')
            return []
        }
    }

    /**
     *
     * @param start
     * @param end
     */
    const threeConsecutiveMonth = (start: Dayjs, end: Dayjs) => {
        const firstMonthLastDay = start.endOf('month')
        const secondMonthFirstDay = end.add(1, 'month').startOf('month')

        const secondMonthStartDay = firstMonthLastDay.isSame(secondMonthFirstDay, 'week')
            ? secondMonthFirstDay.add(1, 'week')
            : secondMonthFirstDay


        const secondMonthLastDay = secondMonthStartDay.endOf('month')
        const lastMonthFirstDay = end.startOf('month')

        // Whether the last day of the second month and the last day of the last month is in the same week
        const lastMonthStartDay = secondMonthLastDay.isSame(lastMonthFirstDay, 'week')
            ? lastMonthFirstDay.add(1, 'week')
            : lastMonthFirstDay

        return [
            [start, firstMonthLastDay],
            [secondMonthStartDay.startOf('week'), secondMonthLastDay],
            [lastMonthStartDay.startOf('week'), end],
        ]
    }

    /**
     *
     * @param start
     * @param end
     */
    const adjacentMonth = (start: Dayjs, end: Dayjs) => {
        // the last day of the start month
        const firstMonthLastDay = start.endOf('month')
        // the first day of the end month
        const lastMonthFirstDay = end.startOf('month')
        // check if these two days are in the same week.
        const isSameWeek = firstMonthLastDay.isSame(lastMonthFirstDay, 'week')
        // determine if they are in the same week.
        const lastMonthStartDay = isSameWeek
            ? lastMonthFirstDay.add(1, 'week')
            : lastMonthFirstDay

        // return the date range for the start and end months.
        return [
            [start, firstMonthLastDay], // the start date and end date of the start month.
            [lastMonthStartDay.startOf('week'), end] // the start date and end date of the end month.
        ];
    }

    /**
     * Pick a day
     * @param day
     */
    const pickDay = (day: Dayjs) => {
        realSelectedDay.value = day
    }

    return {
        date,
        pickDay
    }
}
