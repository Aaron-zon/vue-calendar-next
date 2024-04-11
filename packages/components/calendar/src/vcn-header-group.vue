<script setup lang="ts">
import type { Layout } from './hooks/use-toolbar'

defineProps<{
    layout: Layout
    toolbarInfo: any
}>()


</script>

<template>
    <div class="vcn-header-group">
        <div v-for="(group, groupName) in layout" :key="groupName" class="group" :class="groupName">
            <template v-for="item in group">
                <component v-for="sub in item"
                           :key="sub"
                           :is="toolbarInfo[sub].is"
                           v-bind="toolbarInfo[sub].bind"
                           v-on="toolbarInfo[sub].emit"
                />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vcn-header-group {
    display: flex;

    .group {
        flex: 1;
        border: 1px solid black;
        text-align: center;
    }

}
</style>
