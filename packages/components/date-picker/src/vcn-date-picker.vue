<script lang="ts" setup>
import { ref, provide } from 'vue'
import { useDatePicker } from './hooks/use-date-picker'
import VcnDatePickerHeader from './vcn-date-picker-header.vue'
import VcnDatePickerBody from './date-table.vue'
import VcnDatePickerMonthBody from './vcn-month-table.vue'
import VcnDatePickerYearBody from './vcn-year-table.vue'

import type { DatePickerProps } from './hooks/use-date-picker'

const COMPONENT_NAME = 'VcnDatePicker'
defineOptions({ name: COMPONENT_NAME })

const props = defineProps<DatePickerProps>()
const emit = defineEmits(['selectedMonth', 'selectedYear'])

const { 
    mode, 
    date, 
    year, 
    month, 
    changeMode, 
    changeYear,
    selectedYear,
    selectedMonth 
} = useDatePicker(props, emit)

const yearRange = ref([0, 0])
const tableElCount = 12
const rowElCount = 4


provide('yearRange', yearRange)
provide('yearCount', tableElCount)
provide('rowYearCount', rowElCount)
</script>

<template>
    <div class="vcn-date-picker">
        <div class="vcn-dp-header">
            <slot name="header">
                <VcnDatePickerHeader 
                    :mode :date :year :month 
                    @changeMode="changeMode"
                    @changeYear="changeYear"
                />
            </slot>
        </div>
        <div class="vcn-dp-body">
            <VcnDatePickerBody
                v-show="mode === 0"
                :date
            />
            <VcnDatePickerMonthBody
                v-show="mode === 1"
                @selected="selectedMonth"
                :year
                :date
                :month
            />
            <VcnDatePickerYearBody
                v-show="mode === 2"
                @selected="selectedYear"
                :date
                :year
            />
        </div>
        <div class="vcn-dp-footer">
        </div>
    </div>
</template>

<style>
@import "./styles/base.scss";
</style>
<style lang="scss" scoped>
.vcn-date-picker {
    background-color: var(--vcn-dp-bg-color);
    border: 1px solid var(--vcn-dp-border-color);
    box-shadow: var(--vcn-dp-box-shadow-light);
}
</style>
