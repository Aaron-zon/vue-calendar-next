<script setup lang="ts">
import { useMonthTable } from './hooks/use-month-table'

const { monthTable } = useMonthTable()
console.log(monthTable.value)
const emit = defineEmits(['selected'])

const selected = (col) => {
    emit('selected', col)
}
</script>

<template>
    <div class="vcn-date-picker-month-body">
        <table class="vcn-month-table">
            <tbody>
                <tr v-for="(monthRow, rowIdx) in monthTable" :key="rowIdx">
                    <td v-for="month in monthRow" :key="month.value" @click="selected(col)">
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
