<script setup lang="ts">
import {computed, type ComputedRef} from 'vue'
import dayjs from 'dayjs';
import { useLocale } from '@vue-calendar-next/hooks'

import type { Dayjs } from 'dayjs'

const props = defineProps<{
    date: ComputedRef<Dayjs>
    format?: string
}>()

const { t } = useLocale()

const i18nMonthDate = computed(() => {
    if (props.format) return dayjs(props.date.value).format(props.format)

    const month = t(`el.datepicker.month.${props.date.value.format('M')}`)
    const year = `${props.date.value.year()}${t('el.datepicker.year')}`
    return `${month} ${year}`

})

</script>

<template>
    <div class="vcn-header__title">
        <h2 class="title">
            {{ i18nMonthDate }}
        </h2>
    </div>
</template>

<style lang="scss" scoped>

</style>
