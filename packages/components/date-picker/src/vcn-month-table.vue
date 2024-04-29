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

const monthClass = (monthVal: number) => {
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
                    <td v-for="month in monthRow" :key="month.value" :class="monthClass(month.value)" @click="selected(month.value)">
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
.vcn-date-picker-month-body {
    margin: 0 15px 15px;
    border-top: 1px solid var(--vcn-dp-border-color);

    .vcn-month-table {
        width: 100%;
        tr {
            display: flex;

            td {
                flex: 1;
                text-align: center;
                padding: 8px 0;
                cursor: pointer;

                &.is-today {
                    .cell {
                        color: var(--vcn-dp-color-primary);
                        font-weight: bold;
                    }
                }

                &.is-selected {
                    div {
                        border-radius: 24px;
                        margin-left: 3px;
                        margin-right: 3px;
                    }

                    .cell {
                        color: #ffffff;
                        background-color: var(--vcn-dp-active-color);

                        &:hover {
                            color: #ffffff;
                        }
                    }

                }

                div {
                    height: 48px;
                    padding: 6px 0;
                    box-sizing: border-box;

                    .cell {
                        width: 60px;
                        height: 36px;
                        display: block;
                        line-height: 36px;
                        color: var(--vcn-dp-text-color-regular);
                        margin: 0 auto;
                        border-radius: 18px;
                        font-size: 12px;

                        &:hover {
                            color: var(--vcn-dp-hover-text-color);
                        }


                    }
                }

            }
        }
    }
}
</style>
