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
        center: 'title',
        right: 'today prev,next',
    }),
    toolbarInfo: () => ({
        prev: '上一月',
        next: '下一月',
        today: '今天',
    })
})
const emit = defineEmits(['update:modelValue', 'input']);

const { date, selectDate, realSelectedDay, validatedRange, pickDay } = useCalendar(props, emit)
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
    <div class="vcn-calendar">
        <div class="vcn-header">
            <slot>
                <VcnHeaderGroup v-bind="vcnHeaderGroupProps" ></VcnHeaderGroup>
            </slot>
        </div>
        <div class="vcn-body">
            <template v-if="validatedRange.length === 0">
                <VcnDateTable :date="date" :selected-day="realSelectedDay" :events="props.events" @pick="pickDay" />
            </template>
            <template v-else>
                <VcnDateTable v-for="(range_, index) in validatedRange"
                              :key="index"
                              :data="range_[0]"
                              :selected-day="realSelectedDay"
                              :range="range_"
                              :hide-header="index !== 0"
                              @pick="pickDay" />
            </template>
        </div>
    </div>
</template>

<style lang="scss">
@import "./style/base";
</style>
<style lang="scss" scoped>
.vcn-calendar {
    background-color: var(--vcn-bg-color);
    background-color: #fff;
    padding: 12px;

    .vcn-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
    }
}

</style>
