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
        right: ''
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

    console.log(layout)

    return {
        layout,
        toolbarInfo
    }
})

</script>

<template>
    <div class="vcn-calendar">
        <div class="vcn-header">
            <slot>
                <VcnHeaderGroup v-bind="vcnHeaderGroupProps" ></VcnHeaderGroup>
            </slot>
        </div>
        <div class="vcn-body">
            <VcnDateTable :date="date" :selected-day="realSelectedDay" :events="props.events" @pick="pickDay" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vcn-calendar {
    //--fc-bg-color: #fff;
    --vcn-button-bg-color: #2c3e50;
    --vcn-button-border-color: #2c3e50;
    --fc-button-text-color: #fff;
    //--fc-button-hover-bg-color: #1e2b37;
    //--fc-button-hover-border-color: #1a252f;
    //--fc-button-active-bg-color: #1a252f;
    //--fc-button-active-border-color: #151e27;
    //--fc-a-hover-border-color: #151e27;
    //--fc-today-text-color: #409eff;
    //--fc-selected-text-color: #409eff;
    //--fc-calendar-selected-bg-color: #ecf5ff;

    //--fc-daygrid-event-dot-width: 8px;
    //--fc-event-border-color: #3788d8;
    //--fc-event-bg-color: #3788d8;
    //--fc-event-text-color: #fff;

    .vcn-header {
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
    }
}

</style>
