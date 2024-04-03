export interface HeaderGroup {
    modelValue?: string
    range?: any[]
    headerLayout?: HeaderGroupLayout
    headerToolbar?: Record<string, ButtonStyle> | string
}

export type HeaderGroupLayout = Record<GroupLayoutKey , string | null>

export type GroupLayoutKey = 'left' | 'right' | 'center'

export type ButtonStyle = {
    text?: string,
    icon?: string,
    class?: string | string[]
    callback?: Function | null,
}

