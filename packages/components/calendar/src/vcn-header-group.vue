<script setup lang="ts">
import type { Layout } from './hooks/use-toolbar'

defineProps<{
    layout: Layout
    toolbarInfo: any
}>()

</script>

<template>
    <div class="vcn-header-group">
        <div v-for="(group, groupName) in layout" :key="groupName" class="vcn-h-group" :class="groupName">
            <template v-for="(item, i) in group" :key="i">
                <div class="vcn-h-sub-group" :class="{multiple: item.length > 1}">
                    <component v-for="sub in item"
                               :key="sub"
                               :is="toolbarInfo[sub].is"
                               v-bind="toolbarInfo[sub].bind"
                               v-on="toolbarInfo[sub].emit"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vcn-header-group {
    width: 100%;
    display: flex;

    .vcn-h-group {
        flex: 1;
        display: flex;

        .vcn-h-sub-group {
            display: flex;
            margin: 0 5px;

            .vcn-button {
                flex: 1 1 auto;
                font-size: 1em;
            }
        }

        .multiple {
            .vcn-button{

                &:not(:first-child) {
                    border-bottom-left-radius: 0px;
                    border-top-left-radius: 0px;
                }

                &:not(:last-child) {
                    border-bottom-right-radius: 0px;
                    border-top-right-radius: 0px;
                }

            }

        }
    }

}
</style>
