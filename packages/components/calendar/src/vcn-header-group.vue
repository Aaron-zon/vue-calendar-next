<script setup lang="ts">
import { computed } from 'vue'
import { merge } from 'lodash-es'
import { isString } from './utils'
import { useCalendar } from './hooks/use-calendar'
import { useToolbar } from './hooks/use-toolbar'

import type { HeaderGroup } from './type'

const props = withDefaults(defineProps<HeaderGroup>(), {
    headerLayout: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    headerToolbar: {
        prev: 'prev',
        next: 'next',
        today: 'today',
        dayGridMonth: 'month',
        timeGridWeek: 'week',
        timeGridDay: 'day',
        listWeek: 'list'
    }
})

const emit = defineEmits(['update:modelValue', 'input'])

const { date } = useCalendar(props, emit)
const { defToolbarGroup, toolbarLayoutFormat } = useToolbar(props)

const groupLayout = computed(() => {
    return {
        leftGroup: toolbarLayoutFormat('left'),
        centerGroup: toolbarLayoutFormat('center'),
        rightGroup: toolbarLayoutFormat('right'),
    }
})

const toolbarGroup = computed(() => {
    const title = {
        bind: { date }
    }
    const result = merge({title}, defToolbarGroup)
    for (const toolbarName in props.headerToolbar) {
        const toolbar = props.headerToolbar[toolbarName]
        if (isString(toolbar)) {
            result[toolbarName].bind.text = toolbar
        } else {
            merge(result[toolbarName].bind, toolbar)
        }
    }
    return result
})

</script>

<template>
    <div class="header">
        <div v-for="(group, groupName) in groupLayout" :key="groupName" :class="groupName">
            <template v-for="item in group">
                <component v-for="sub in item"
                           :key="sub"
                           :is="toolbarGroup[sub].is"
                           v-bind="toolbarGroup[sub].bind"
                           v-on="toolbarGroup[sub].emit"
                />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
