import type { Dayjs } from 'dayjs'



export interface DateTableProps {
    date: Dayjs
    selectedDay: Dayjs
    range?: [Dayjs, Dayjs]
    events?: EventList
}