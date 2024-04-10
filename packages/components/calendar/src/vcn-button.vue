<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    name?: string
    text?: string
    icon?: any
}>()

const emit = defineEmits(['selectDate'])

const isIcon = computed(() => {
    return props.icon != null
})

const select = () => {
    emit('selectDate', props.name)
}
</script>

<template>
    <button class="header-button" @click="select">
        <span v-if="!isIcon">{{ props.text }}</span>
        <span v-else class="icon"></span>
    </button>
</template>

<style lang="scss" scoped>

</style>
