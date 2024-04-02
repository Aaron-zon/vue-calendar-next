<script lang="ts" setup >
import HeaderGroup from './vcn-header-group.vue'
import Body from './vcn-body.vue'

const COMPONENT_NAME = 'VnCalendar'
defineOptions({ name: COMPONENT_NAME })

const props = defineProps<{
    modelValue: string
}>()
</script>

<template>
    <div class="vn-calendar">
        <div class="vn-header">
            <div class="vn-header__button--group">
                <slot>
                    <HeaderGroup v-model="props.modelValue"></HeaderGroup>
                </slot>
            </div>

        </div>
        <div class="vn-body">
            <Body></Body>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vn-calendar {
    border: 1px solid black;
    // width: max-content;
    // height: max-content;
    background-color: #eee;
}
</style>