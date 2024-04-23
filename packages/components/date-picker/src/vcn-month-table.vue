<script setup lang="ts">
import { useDataTable } from './hooks/use-data-table'

const { monthTable } = useDataTable()
console.log(monthTable.value)
</script>

<template>
    <div class="vcn-date-picker-month-body">
        <table class="vcn-month-table">
            <tbody>
                <tr v-for="(row, rowIdx) in monthTable" :key="rowIdx">
                    <td v-for="col in row" :key="col">
                        <div>
                            <span class="cell">{{ col }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.vcn-date-picker-month-body {
    margin: 15px;
    margin-top: 0;

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
