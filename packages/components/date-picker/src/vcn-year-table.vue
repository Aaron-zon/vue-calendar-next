<script setup lang="ts">
import { useYearTable } from './hooks/use-year-table'
import dayjs from 'dayjs'

import type { YearTableProps } from './hooks/use-year-table'

const props = defineProps<YearTableProps>()
const emit = defineEmits(['selected'])

const { year, yearTable, setSelectedYear } = useYearTable(props)

const today = dayjs()

const addClass = (yearVal: number) => {
    return {
        'is-today': today.year() === yearVal,
        'is-selected': year.value === yearVal
    }
}

const selected = (yearVal: number) => {
    setSelectedYear(yearVal)
    emit('selected', yearVal)
}
</script>

<template>
    <div class="vcn-date-picker-year-body">
        <table class="vcn-year-table">
            <tbody>
                <tr v-for="(yearRow, rowIdx) in yearTable" :key="rowIdx">
                    <td v-for="year in yearRow" :key="year" :class="addClass(year)" @click="selected(year)">
                        <div>
                            <span class="cell">{{ year }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
@import "./styles/mixin.scss";

.vcn-date-picker-year-body {
    @include dp-table();
}
</style>
