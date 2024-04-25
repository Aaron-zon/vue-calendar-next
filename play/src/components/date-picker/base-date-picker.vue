<script lang="ts" setup>
import dayjs from 'dayjs'
const date = dayjs('2024-05-28')
</script>

<template>
    <div class="play">
        <div class="calendar-wrapper">
            <VcnDatePicker v-model:modelValue="date"></VcnDatePicker>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.play {
    box-sizing: border-box;
    padding: 100px 0;
    background-color: #eee;
    display: flex;
}
.calendar-wrapper {
    width: 320px;
    margin: 0 auto;
    //border: 1px solid black;
}
</style>
