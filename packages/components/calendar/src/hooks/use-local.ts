import { computed, ref, unref, isRef } from 'vue'
import { get } from 'lodash-es'
import { zhCn, type Language} from '../local'

export type TranslatorOption = Record<string, string | number>
import type { Ref, ComputedRef } from 'vue'


export const useLocale = (localeOverrides?: Ref<Language>) => {
    const locale = localeOverrides
    return buildLocaleContext(computed(() => locale?.value || zhCn))
}

export const buildTranslator = (locale: ComputedRef<Language>) => (path: string, option?: TranslatorOption | undefined) => translate(path, option, unref(locale));

/**
 * 查询locale中是否有path地址的数据，并对得出的数据进行replace
 * @param { String } path 
 * @param { Object } option 
 * @param { Object } locale 
 */
export const translate = (
    path: string, 
    option: TranslatorOption | undefined, 
    locale: Language
): string => {
    // /\{\w+)\}/: 匹配 左侧： {； 中间：一个或多个字母； 右侧： }；的字符串
    // _ : 表示整个字符串； key：表示正则表达式中捕获的分组；
    return get(locale, path, path).replace(/\{(\w+)\}/g, (_: string, key: string) => `${option?.[key] ?? `{${key}}`}`);
}

export const buildLocaleContext = (locale: ComputedRef<Language>) => {
    const lang = computed(() => unref(locale).name);
    const localeRef = isRef(locale) ? locale : ref(locale)

    return {
        lang,
        locale: localeRef,
        t: buildTranslator(locale)
    };
}