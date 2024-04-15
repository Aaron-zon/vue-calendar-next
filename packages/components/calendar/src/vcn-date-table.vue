<script setup lang="ts">
import dayjs from 'dayjs';
import { useDateTable } from './hooks/use-date-table.js';
import type { DateTableProps, CalendarDateCell } from './hooks/use-date-table.js';
import type { EventType } from './hooks/use-calendar'

const props = defineProps<DateTableProps>()

const emit = defineEmits(['pick'])

const { weekDays, rows, eventMap } = useDateTable(props);

const colClass = (cell: CalendarDateCell) => {
    const {type, text} = cell;
    const day = props.date.date();
    return {
        'is-selected': day == text && type == 'current',
    }
}

const cellClass = (cell: CalendarDateCell) => {
    const {type, text} = cell;
    return {
        'vcn-current-date': type == 'current',
        'is-today': (props.date.format('YYYYMM') + text) == dayjs().format('YYYYMMDD'),
        'is-selected': props.date.date() == text && type == 'current',
    }
}

const pickDay = (cell: CalendarDateCell) => {
    let selectedDate = props.date;
    if (cell.type == 'prev') {
        selectedDate = selectedDate.add(-1, 'month').set('date', cell.text);
    } else if (cell.type == 'next') {
        selectedDate = selectedDate.add(1, 'month').set('date', cell.text);
    } else {
        selectedDate = props.date.set('date', cell.text);
    }

    emit('pick', selectedDate);
}

const eventManage = (cell: CalendarDateCell) => {
    const {type, text} = cell;
    let date = props.date;
    if (type == 'prev') {
        date = date.add(-1, 'month').set('date', text)
    } else if (type == 'next') {
        date = date.add(-1, 'month').set('date', text)
    } else {
        date = date.set('date', text);
    }

    return !!eventMap.value[date.format('YYYY-MM-DD')];
}

const eventClass = (event: EventType) => {
    if (!event.start) {
        return [];
    }
    const resClass: string[] = [];
    const start = dayjs(event.start);
    const end = event.end ? dayjs(event.end) : null;
    const startTime = start.format('HH:mm:ss');
    const endTime = end ? end.format('HH:mm:ss') : '00:00:00';
    if (startTime === '00:00:00' && endTime === '00:00:00') {
        resClass.push('vcn-all-day-event');
    }

    return resClass;
}
</script>

<template>
    <table class="vcn-date-table">
        <thead>
            <tr class="vcn-h-row vcn-row">
                <th class="vcn-h-col vcn-col" v-for="(item, index) in weekDays" :key="index">{{ item }}</th>
            </tr>
        </thead>

        <tbody>
            <tr class="vcn-row" v-for="(row, index) in rows" :key="index">
                <td v-for="(cell, key) in row" :key="key"
                    class="vcn-col" :class="colClass(cell)"
                    @click="pickDay(cell)"
                >
                    <div class="vcn-day-grid-day-frame">
                        <div class="vcn-day-grid-day-top" :class="cellClass(cell)">
                            <a href="#" class="vcn-day-grid-day-number">{{ cell.text }}</a>
                        </div>

                        <div class="vcn-day-grid-day-events">
                            <template v-if="eventManage(cell)">
                                <div class="vcn-day-grid-event-harness" v-for="(event, index) in eventMap[cell.date]" :key="index">
                                    <a href="#" :class="['vcn-event', ...eventClass(event)]">
                                        <div class="vcn-day-grid-event-dot"></div>
                                        <div class="vcn-event-time">{{ event.time }}</div>
                                        <div class="vcn-event-title">{{ event.title }}</div>
                                    </a>
                                </div>
                            </template>
                        </div>
                    </div>

                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
.vcn-date-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;

    .vcn-row {
        display: flex;
        width: 100%;

        .vcn-col {
            flex: 1;
            border: 1px solid var(--vcn-border-color);
            margin-left: -1px;
            margin-top: -1px;

            .vcn-day-grid-day-frame {
                height: var(--vcn-calendar-cell-width);

                .vcn-day-grid-day-top {
                    user-select: none;
                    box-sizing: border-box;
                    padding: 0 5px;
                    margin: 3px 0;
                    text-align: right;
                    height: 24px;
                    opacity: .3;

                    .vcn-day-grid-day-number {
                        user-select: none;

                        &:hover {
                            border-bottom: 1px solid var(--vcn-a-hover-border-color);
                        }
                    }
                }

                .vcn-current-date {
                    opacity: 1;
                }

                .is-today {
                    color: var(--vcn-today-text-color);
                    font-weight: 600;
                }

                .is-selected {
                    color: var(--vcn-selected-text-color);
                }
            }

            &.is-selected {
                background-color: var(--vcn-calendar-selected-bg-color)
            }
        }
    }
}
</style>
