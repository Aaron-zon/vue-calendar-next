<script lang="ts" setup>
import HeaderButtonGroup from './components/header/index.vue'

const COMPONENT_NAME = 'VnCalendar'
defineOptions({ name: COMPONENT_NAME })

</script>

<template>
    <div class="vn-calendar">
        <div class="vn-header">
            <div class="vn-header__button--group">
                <slot>
                    <HeaderButtonGroup></HeaderButtonGroup>
                </slot>
            </div>

        </div>
        <div class="vn-body">

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