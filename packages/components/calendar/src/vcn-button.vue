<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    icon?: any
}>()

const isIcon = computed(() => {
    return props.icon != null
})
</script>

<template>
    <button class="header-button">
        <span v-if="!isIcon">按钮</span>
        <span v-else class="icon"></span>
    </button>
</template>

<style lang="scss" scoped>

</style>
