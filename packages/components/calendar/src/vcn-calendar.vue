<script lang="ts" setup >
import HeaderGroup from './vcn-header-group.vue'
import Body from './vcn-body.vue'

const COMPONENT_NAME = 'VnCalendar'
defineOptions({ name: COMPONENT_NAME })

const model = defineModel()
const props = defineProps<{
  modelValue: any,
  range?: any[]
}>()


</script>

<template>
    <div class="vn-calendar">
        <div class="vn-header">
            <div class="vn-header__button--group">
                <slot>
                    <HeaderGroup v-model="model" :range="props.range"></HeaderGroup>
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
