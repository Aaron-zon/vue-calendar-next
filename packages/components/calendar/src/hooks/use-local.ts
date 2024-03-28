import { computed, ref, unref, isRef, type Ref} from 'vue'
import { get } from 'lodash-es'
import { Cn } from '../local'
import type { Language } from '../local'

export const useLocale = (localeOverrides: Language | Ref | null = null) => {
    const locale:Language | Ref = localeOverrides || Cn;
    return buildLocaleContext(computed(() => locale.value || locale));
}

export const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));

/**
 * 查询locale中是否有path地址的数据，并对得出的数据进行replace
 * @param { String } path 
 * @param { Object } option 
 * @param { Object } locale 
 */
export const translate = (path, option, locale) => {
    // /\{\w+)\}/: 匹配 左侧： {； 中间：一个或多个字母； 右侧： }；的字符串
    // _ : 表示整个字符串； key：表示正则表达式中捕获的分组；
    return get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
}

export const buildLocaleContext = (locale) => {
    const lang = computed(() => unref(locale).name);
    const localeRef = isRef(locale) ? locale : ref(locale)

    return {
        lang,
        locale: localeRef,
        t: buildTranslator(locale)
    };
}