<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const now1 = dayjs()

const date = ref(now1)
// const range = [dayjs('2024-01-02'), dayjs(2024-01-17)]

</script>

<template>
    <div class="play">
        <div class="calendar-wrapper">
            <VnCalendar v-model:modelValue="date" format="M月 YYYY年"></VnCalendar>
<!--            <VnCalendar :range="range"></VnCalendar>-->
        </div>
  </div>
</template>

<style scoped>
.play {
    box-sizing: border-box;
    padding: 100px 0;
    background-color: #eee;
}

.calendar-wrapper {
    width: 1100px;
    margin: 0 auto;
}
</style>
