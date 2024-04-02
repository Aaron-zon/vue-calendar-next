<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from './hooks/use-local'

const props = defineProps<{date: any}>()

const { t } = useLocale()

const i18nMonthDate = computed(() => {
    const month = t(`el.datepicker.month.${props.date.format('M')}`)
    const year = `${props.date.year()}${t('el.datepicker.year')}`
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