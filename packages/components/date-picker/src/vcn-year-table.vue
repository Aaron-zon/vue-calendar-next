<script setup lang="ts">
import { useYearTable } from './hooks/use-year-table'
import dayjs from 'dayjs'

import type { YearTableProps } from './hooks/use-year-table'
const props = defineProps<YearTableProps>()

const { yearTable } = useYearTable(props)

const today = dayjs()

const addClass = (yearVal: number) => {
    console.log(yearTable.value[0][0])
    return {
        'is-today': today.year() === yearVal,
        // 'is-selected':  === yearVal'
    }
}
</script>

<template>
    <div class="vcn-date-picker-year-body">
        <table class="vcn-year-table">
            <tbody>
                <tr v-for="(yearRow, rowIdx) in yearTable" :key="rowIdx">
                    <td v-for="year in yearRow" :key="year" :class="addClass(year)">
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
