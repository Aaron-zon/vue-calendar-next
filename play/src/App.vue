<script setup lang="ts">
import { ref } from 'vue'
const date = ref('2024/04/02')
</script>

<template>
  <div class="play">
    <VnCalendar v-model:modelValue="date"></VnCalendar>
  </div>
</template>

<style scoped>
.play {
    border: 1px solid black;
    width: 500px;
    height: 500px;
    margin: 100px auto;
}
</style>
