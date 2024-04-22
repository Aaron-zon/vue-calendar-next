<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
const now = dayjs()

const date = ref(now)
// const range = [dayjs('2024-01-02'), dayjs(2024-01-17)]

const events = [
    {
        start: `${now.format('YYYY-MM')}-22T10:30:00`,
        title: '任务描述',
    },
    {
        start: `${now.format('YYYY-MM')}-24T10:30:00`,
        end: `${now.format('YYYY-MM')}-24T12:30:00`,
        title: '任务描述',
        time: '10:30a'
    },
    {
        start: `${now.format('YYYY-MM')}-25T16:00:00`,
        end: `${now.format('YYYY-MM')}-25T17:30:00`,
        title: '任务描述',
    },
    {
        start: `${now.format('YYYY-MM')}-05`,
        end: `${now.format('YYYY-MM')}-05`,
        title: '游玩',
    },
    {
        start: `${now.format('YYYY-MM')}-25T08:00:00`,
        end: `${now.format('YYYY-MM')}-25T10:30:00`,
        title: '任务描述',
    },
]

</script>

<template>
    <div class="play">
        <div class="calendar-wrapper">
            <VcnCalendar v-model:modelValue="date" format="M月 YYYY年" :events></VcnCalendar>
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
