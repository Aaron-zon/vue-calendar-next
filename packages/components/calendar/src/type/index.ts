export interface HeaderGroup {
    date: any
    modelValue?: any
    range?: any[]
    headerLayout?: Record<string , string | null>
    headerToolbar?: Record<string, ButtonStyle | string>
}

export type ButtonStyle = {
    text?: string,
    icon?: string,
    class?: string | string[]
    callback?: Function | null,
}

export interface DateTableBody {
    selectedDay: any
    range: any[]
    date: any
    hideHeader: boolean
    events: any[]
}
