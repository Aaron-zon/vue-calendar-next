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
    <button class="vcn-button vcn-button__primary" @click="select">
        <template v-if="!isIcon">{{ props.text }}</template>
        <span v-else class="icon"></span>
    </button>
</template>

<style lang="scss" scoped>
.vcn-button {
    border: 1px solid transparent;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.4em 0.65em;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    appearance: menulist-button;
    margin: 0;
    overflow: visible;
    text-transform: none;
    cursor: pointer;
    transition: border-color 0.25s;
    border-radius: 8px;

    &__primary {
        background-color: var(--vcn-button-bg-color);
        border-color: var(--vcn-button-border-color);
        color: var(--fc-button-text-color);
    }
}
</style>
