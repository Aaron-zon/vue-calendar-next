<script setup lang="ts">
import dayjs from 'dayjs';
import { useDateTable } from './hooks/use-date-table.js';
import type { DateTableProps, CalendarDateCell, EventType } from './hooks/use-date-table.js';

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
            <tr>
                <th v-for="(item, index) in weekDays" :key="index">{{ item }}</th>
            </tr>
        </thead>

        <tbody>
            <tr class="vcn-row" v-for="(row, index) in rows" :key="index">
                <td v-for="(cell, key) in row" :key="key" 
                    class="vcn-col" :class="colClass(cell)"
                    @click="pickDay(cell)"
                >
                    <div class="vcn-daygrid-day-frame">
                        <div class="vcn-daygrid-day-top">
                            <a href="#" class="vcn-daygrid-day-number">{{ cell.text }}</a>
                        </div>

                        <div class="vcn-daygrid-day-events">
                            <template v-if="eventManage(cell)">
                                <div class="vcn-daygrid-event-harness" v-for="(event, index) in eventMap[cell.date]" :key="index">
                                    <a href="#" :class="['vcn-event', ...eventClass(event)]">
                                        <div class="vcn-daygrid-event-dot"></div>
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

</style>