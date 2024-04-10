import VcnTitle from '../vcn-title.vue'
import VcnButton from '../vcn-button.vue'

export const useToolbar = (props) => {
    const toolbarList = ['title', 'prev','next','today','dayGridMonth','timeGridWeek','timeGridDay','listWeek']

    const getDefToolbarInfo = () => {
        const result = {}
        for (const toolbar of toolbarList) {
            result[toolbar] = {
                is: toolbar === 'title' ? VcnTitle : VcnButton,
                bind: {name: toolbar},
                emit: {},
            }
        }
        return result
    }

    const defToolbarInfo = getDefToolbarInfo()

    function layoutAnalysis(location: string): ToolbarGroup {
        if (!props.headerLayout[location]) return []

        return props.headerLayout[location]
                .split(' ')
                .map((item: string) => item.split(','))
    }

    return {
        toolbarList,
        defToolbarInfo,
        layoutAnalysis,
    }
}

export type ToolbarGroup = string[][]
export type Layout = Record<string, ToolbarGroup>