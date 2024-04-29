<script lang="ts" setup>
import { useDatePicker } from './hooks/use-date-picker'
import VcnDatePickerHeader from './vcn-date-picker-header.vue'
import VcnDatePickerBody from './vcn-date-picker-table.vue'
import VcnDatePickerMonthBody from './vcn-month-table.vue'
import VcnDatePickerYearBody from './vcn-year-table.vue'

import type { DatePickerProps } from './hooks/use-date-picker'

const COMPONENT_NAME = 'VcnDatePicker'
defineOptions({ name: COMPONENT_NAME })

const props = defineProps<DatePickerProps>()
const emit = defineEmits(['selectedMonth'])

const { 
    mode, 
    date, 
    year, 
    month, 
    changeMode, 
    changeYear, 
    selectedMonth 
} = useDatePicker(props, emit)

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
                v-if="mode === 0"
            />
            <VcnDatePickerMonthBody
                v-else-if="mode === 1"
                @selected="selectedMonth"
                :year
                :date
                :month
            />
            <VcnDatePickerYearBody
                v-else-if="mode === 2"
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
