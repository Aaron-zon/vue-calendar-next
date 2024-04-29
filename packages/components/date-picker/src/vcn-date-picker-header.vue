<script setup lang="ts">
import { useDatePickerHeader } from './hooks/use-date-picker-header'
import DArrowRight from '@vue-calendar-next/components/icon/d-arrow-right.vue'
import DArrowLeft from '@vue-calendar-next/components/icon/d-arrow-left.vue'
import ArrowRight from '@vue-calendar-next/components/icon/arrow-right.vue'
import ArrowLeft from '@vue-calendar-next/components/icon/arrow-left.vue'

import type { DatePickerHeaderProps } from './hooks/use-date-picker-header'

const props = defineProps<DatePickerHeaderProps>()
const emit = defineEmits(['changeMode', 'changeYear'])

const { 
    yearText, 
    monthText,
    yearSearch,
    monthSearch,
    arrowLeftClick,
    arrowRightClick,
    dArrowLeftClick,
    dArrowRightClick,
} = useDatePickerHeader(props, emit)

</script>

<template>
    <div class="vcn-date-picker-header">
        <span class="vcn-dp-prev">
            <button class="vcn-dp-prev-year vcn-dp-prev-btn" @click="dArrowLeftClick">
                <DArrowLeft />
            </button>
            <button class="vcn-dp-prev-month vcn-dp-prev-btn" v-if="props.mode == 0" @click="arrowLeftClick">
                <ArrowLeft />
            </button>
        </span>
        <span class="vcn-dp-title">
            <span class="vcn-dp-header-text" @click="yearSearch">{{ yearText }}</span>
            <span class="vcn-dp-header-text" v-if="props.mode == 0" @click="monthSearch">{{ monthText }}</span>
        </span>
        <span class="vcn-dp-next">
            <button class="vcn-dp-next-month vcn-dp-next-btn" v-if="props.mode == 0" @click="arrowRightClick">
                <ArrowRight />
            </button>
            <button class="vcn-dp-next-year vcn-dp-next-btn" @click="dArrowRightClick">
                <DArrowRight />
            </button>
        </span>
    </div>
</template>

<style scoped lang="scss">
.vcn-date-picker-header {
    margin: 12px;
    text-align: center;
    color: var(--vcn-dp-text-color-regular);
    line-height: 30px;
    display: flex;
    justify-content: space-between;

    .vcn-dp-prev-btn, .vcn-dp-next-btn {
        padding: 0 5px;
        cursor: pointer;

        &:hover {
            color: var(--vcn-dp-hover-text-color);
        }
    }

    .vcn-dp-header-text {
        font-size: 16px;
        font-weight: 500;
        padding: 0 5px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: var(--vcn-dp-hover-text-color);
        }
    }
}
.vcn-base-icon {
    width: 12px;
}
button {
    border: 0;
    background-color: #fff;
}
</style>
