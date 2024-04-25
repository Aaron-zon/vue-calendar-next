<script lang="ts" setup>
import { ref } from 'vue'
import VcnDatePickerHeader from './vcn-date-picker-header.vue'
import VcnDatePickerBody from './vcn-date-picker-table.vue'
import VcnDatePickerMonthBody from './vcn-month-table.vue'
import VcnDatePickerYearBody from './vcn-year-table.vue'
const COMPONENT_NAME = 'VcnDatePicker'
defineOptions({ name: COMPONENT_NAME })

const bodyMode = ref(1)

const selectedMonth = (month) => {
    console.log(month)
}
</script>

<template>
    <div class="vcn-date-picker">
        <div class="vcn-dp-header">
            <slot name="header">
                <VcnDatePickerHeader />
            </slot>
        </div>
        <div class="vcn-dp-body">
            <VcnDatePickerBody v-if="bodyMode === 0"/>
            <VcnDatePickerMonthBody v-else-if="bodyMode === 1" @selected="selectedMonth" />
            <VcnDatePickerYearBody v-else-if="bodyMode === 2"/>
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
