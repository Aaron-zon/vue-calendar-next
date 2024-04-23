<script setup lang="ts">
import DArrowRight from '@vue-calendar-next/components/icon/d-arrow-right.vue'
import DArrowLeft from '@vue-calendar-next/components/icon/d-arrow-left.vue'
import ArrowRight from '@vue-calendar-next/components/icon/arrow-right.vue'
import ArrowLeft from '@vue-calendar-next/components/icon/arrow-left.vue'


</script>

<template>
    <div class="vcn-date-picker-header">
        <span class="vcn-dp-prev">
            <button class="vcn-dp-prev-year vcn-dp-prev-btn">
                <DArrowLeft />
            </button>
            <button class="vcn-dp-prev-month vcn-dp-prev-btn">
                <ArrowLeft />
            </button>
        </span>
        <span class="vcn-dp-title">
            <span class="vcn-dp-header-text">2024</span>
            <span class="vcn-dp-header-text">4月</span>
        </span>
        <span class="vcn-dp-next">
            <button class="vcn-dp-next-month vcn-dp-next-btn">
                <ArrowRight />
            </button>
            <button class="vcn-dp-next-year vcn-dp-next-btn">
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
