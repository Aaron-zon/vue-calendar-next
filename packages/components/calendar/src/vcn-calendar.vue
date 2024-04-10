<script setup lang="ts">
import { computed } from 'vue'
import { merge, isString } from 'lodash-es'
import { useCalendar } from './hooks/use-calendar'
import { useToolbar } from './hooks/use-toolbar'
import VcnHeaderGroup from './vcn-header-group.vue'
import VcnDateTable from './vcn-date-table.vue'

import type { VcnCalendarProps } from './hooks/use-calendar'
import type { Layout } from './hooks/use-toolbar'

const COMPONENT_NAME = 'VnCalendar'
defineOptions({ name: COMPONENT_NAME })

const props = withDefaults(defineProps<VcnCalendarProps>(), {
    headerLayout: () => ({
        left: 'prev,next today',
        center: 'title',
    }),
    toolbarInfo: () => ({
        prev: '上一月',
        next: '下一月',
        today: '今天',
    })
})
const emit = defineEmits(['update:modelValue', 'input']);

const { date, selectDate, realSelectedDay, pickDay } = useCalendar(props, emit)
const { toolbarList, defToolbarInfo, layoutAnalysis } = useToolbar(props)

const headerLayoutAnalysis = computed((): Layout => {
    return {
        leftGroup: layoutAnalysis('left'),
        centerGroup: layoutAnalysis('center'),
        rightGroup: layoutAnalysis('right'),
    }
})

const vcnHeaderGroupProps = computed(() => {
    const layout: Layout = headerLayoutAnalysis.value
    const toolbarInfo = merge({}, defToolbarInfo)

    // title
    const title = {
        bind: { date }
    }
    merge(toolbarInfo, {title})

    for (const toolName of toolbarList) {
        if ('title' === toolName ) continue

        const tool = props.toolbarInfo[toolName]

        if (isString(tool)) {
            toolbarInfo[toolName].bind.text = tool
        } else {
            merge(toolbarInfo[toolName].bind, tool)
        }
        merge(toolbarInfo[toolName].emit, {selectDate})
    }

    return {
        layout,
        toolbarInfo
    }
})

</script>

<template>
    <div class="vn-calendar">
        <div class="vn-header">
            <div class="vn-header__button--group">
                <slot>
                    <VcnHeaderGroup v-bind="vcnHeaderGroupProps" ></VcnHeaderGroup>
                </slot>
            </div>

        </div>
        <div class="vn-body">
            <VcnDateTable :date="date" :selected-day="realSelectedDay" :events="props.events" @pick="pickDay" />
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
