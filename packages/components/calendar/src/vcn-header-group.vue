<script setup lang="ts">
import Title from './vcn-title.vue'
import VcnButton from './vcn-header-button.vue'
import { useCalendar } from './hooks/use-calendar'

const props = defineProps<{
    modelValue?: string,
    range?: any[]
}>()
const emit = defineEmits(['update:modelValue', 'input']);

const { date } = useCalendar(props, emit)
</script>

<template>
    <div class="header">
        <Title :date="date"></Title>
        <!-- <VcnButton></VcnButton>
        <VcnButton></VcnButton>
        <VcnButton></VcnButton> -->
    </div>
</template>

<style lang="scss" scoped>

</style>