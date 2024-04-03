import VcnTitle from '../vcn-title.vue'
import VcnButton from '../vcn-button.vue'
export const useToolbar = (props) => {
    const toolbarList = ['title', 'prev','next','today','dayGridMonth','timeGridWeek','timeGridDay','listWeek']

    const getDefToolbarGroupFn = () => {
        const result = {}
        for (const toolbar of toolbarList) {
            result[toolbar] = {
                is: toolbar === 'title' ? VcnTitle : VcnButton,
                bind: {},
                emit: {},
            }
        }
        return result
    }

    const defToolbarGroup = getDefToolbarGroupFn()

    function toolbarLayoutFormat(location: string) {
        return props.headerLayout[location]
            .split(' ')
            .map(item => item.split(','));
    }

    return {
        defToolbarGroup,
        toolbarLayoutFormat
    }
}
