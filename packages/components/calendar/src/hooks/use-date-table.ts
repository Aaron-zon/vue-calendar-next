import { computed } from 'vue'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { useLocale } from '@vue-calendar-next/hooks'
import { rangeArr, getPrevMonthLastDays, getMonthDays, toNestedArr } from './use-utils'

import type { Dayjs } from 'dayjs'
import type { EventList, EventType } from './use-calendar'

export interface DateTableProps {
    date: Dayjs
    selectedDay: Dayjs
    range?: [Dayjs, Dayjs]
    events?: EventList
}

export type CalendarDateCellType = 'next' | 'prev' | 'current'

export type CalendarDateCell = {
    text: number
    type: CalendarDateCellType
}

const { t } = useLocale();

export const useDateTable = (props: DateTableProps) => {
    dayjs.extend(localeData)
    const firstDayOfWeek = dayjs.localeData().firstDayOfWeek()

    const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const isInRange = computed(() => !!props?.range && !!props?.range?.length)

    const weekDays = computed(() => {
        const start = firstDayOfWeek;
        if (0 === start) {
            return WEEK_DAYS.map((_) => t(`el.datepicker.weeks.${_}`))
        } else {
            return WEEK_DAYS.slice(start)
                .concat(WEEK_DAYS.slice(0, start))
                .map((_) => t(`el.datepicker.weeks.${_}`))
        }
    });

    const rows = computed(() => {
        // used to store all dates displayed on the screen.
        let days: CalendarDateCell[];

        // when there is date range information, retrieve values based on the date range.
        if (isInRange.value) {
            const [start, end] = props.range!;
            const currentMonthRange: CalendarDateCell[] = rangeArr(
                end.date() - start.date() + 1
            ).map((index) => ({
                text: start.date() + index,
                type: 'current',
                // date: props.date.set('date', start.date() + index).format('YYYY-MM-DD'),
            }));

            const rowLen = 6 - (Math.floor(currentMonthRange.length / 7));
            let remaining = 7 - (currentMonthRange.length % 7 || 7) + rowLen * 7;

            if (remaining > 0 && rowLen > 0) {
                remaining += (rowLen - 1) * 7
            } else if (remaining == 0 && rowLen > 0) {
                remaining += rowLen * 7
            }

            const nextMonthRange: CalendarDateCell[] = rangeArr(
                remaining
            ).map((_, index) => ({
                text: index + 1,
                type: 'next',
                // date: props.date.add(1, 'month').set('date', index + 1).format('YYYY-MM-DD'),
            }));

            days = currentMonthRange.concat(nextMonthRange);
        } else {
            const firstDay = props.date.startOf('month').day();

            const prevMonthDays: CalendarDateCell[] = getPrevMonthLastDays(
                props.date,
                (firstDay - firstDayOfWeek + 7) % 7
            ).map((day) => ({
                text: day,
                type: 'prev',
                date: props.date.add(-1, 'month').set('date', day).format('YYYY-MM-DD'),
            }));

            const currentMonthDays: CalendarDateCell[] = getMonthDays(
                props.date
            ).map((day) => ({
                text: day,
                type: 'current',
                date: props.date.set('date', day).format('YYYY-MM-DD'),
            }));

            days = [...prevMonthDays, ...currentMonthDays];

            const rowLen = 6 - (Math.floor(days.length / 7));
            let remaining = 7 - (days.length % 7 || 7);

            if (remaining > 0 && rowLen > 0) {
                remaining += (rowLen - 1) * 7
            } else if (remaining == 0 && rowLen > 0) {
                remaining += rowLen * 7
            }

            const nextMonthDays: CalendarDateCell[] = rangeArr(
                remaining
            ).map((_, index) => ({
                text: index + 1,
                type: 'next',
                date: props.date.add(1, 'month').set('date', index + 1).format('YYYY-MM-DD'),
            }));

            days = days.concat(nextMonthDays);
        }
        return toNestedArr(days);
    });

    

    const year = computed(() => {
        return props.date.format('YYYY');
    });

    const month = computed(() => {
        return props.date.format('MM');
    });

    const eventMap = computed(() => {
        const result = {};

        if (!props.events) return result

        for (const event of props.events!) {
            const date = dayjs(event.start);

            if (!result[date.format('YYYY-MM-DD')]) {
                result[date.format('YYYY-MM-DD')] = [];
            }
            result[date.format('YYYY-MM-DD')].push({
                time: eventTime(event),
                currentMonth: year.value == date.format('YYYY') && month.value == date.format('MM'),
                ...event
            });
            result[date.format('YYYY-MM-DD')].sort((a, b) => {
                return dayjs(a.start).valueOf() - dayjs(b.start).valueOf();
            })
        }
        console.log(result)
        return result;
    })

    const eventTime = (event: EventType) => {
        let time = "";
        if (event.start.includes('T') || event.start.includes(' ')) {
            time = dayjs(event.start).format('HH:mma');
            if (time == 'Invalid Date') {
                time = '';
            } else {
                time = time.substring(0, time.length - 1);
                if (time.includes(':00')) {
                    time = time.replace(':00', '');
                }
            }
        }
        return time;
    }

    return {
        weekDays,
        rows,
        eventMap
    }
}


