<script setup lang="ts">
import { useMonthTable } from './hooks/use-month-table'
import dayjs from 'dayjs'

import type { MonthTableProps } from './hooks/use-month-table'

const props = defineProps<MonthTableProps>()
const emit = defineEmits(['selected'])

const { monthTable, month, setSelectedMonth } = useMonthTable(props)

const today = dayjs()

const selected = (monthVal: number) => {
    const date = dayjs().year(props.year).month(monthVal).date(1)
    setSelectedMonth(date)
    emit('selected', { date,  month: monthVal})
}

const addClass = (monthVal: number) => {
    return {
        'is-today': props.year === today.year() && monthVal === today.month(),
        'is-selected': props.year === month.value!.year() && monthVal === month.value!.month(),
    }
}

</script>

<template>
    <div class="vcn-date-picker-month-body">
        <table class="vcn-month-table">
            <tbody>
                <tr v-for="(monthRow, rowIdx) in monthTable" :key="rowIdx">
                    <td v-for="month in monthRow" :key="month.value" :class="addClass(month.value)" @click="selected(month.value)">
                        <div>
                            <span class="cell">{{ month.name }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
@import "./styles/mixin.scss";

.vcn-date-picker-month-body {
    @include dp-table();
}
</style>
