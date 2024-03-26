import type { App } from 'vue'
import type { SFCWithInstall } from './type'

export const withInstall = <T extends Record<string, any>>(main: T) => {
    (main as SFCWithInstall<T>).install = (app: App): void => {
        for (const comp of [main]) {
            app.component(comp.name, comp)
        }
    }
    return main as SFCWithInstall<T>
}
