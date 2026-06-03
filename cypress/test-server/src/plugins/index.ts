/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router'
import vuetify from './vuetify'
import { loadFonts } from './webfontloader'

// Types
import type { App } from 'vue'
import { Vuetify3Dialog } from 'vuetify3-dialog'

// Components
import DialogBaseComponent from '@/components/DialogBaseComponent.vue';

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(Vuetify3Dialog, {
      defaults: {
        baseComponents: {
          dialog: {
            component: DialogBaseComponent
          }
        }
      }
    })
    // .use(Vuetify3Dialog, { defaults: { notify: {location: 'top left'} } })
}
