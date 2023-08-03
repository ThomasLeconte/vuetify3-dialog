import { App, Plugin } from 'vue';
import { initDialogsContext } from './dialogs';
import { initSnackbarContext } from './snackbars';

export const Vuetify3Dialog: Plugin = {
  install(app: App, options: { vuetify: Plugin }) {
    if (!options) {
      console.warn('Dialogs plugin requires options');
    }

    if (!options.vuetify) {
      console.warn('Dialogs plugin requires vuetify plugin, please declare it with Vue.use(Dialogs, { vuetify })');
    }

    initDialogsContext(app, options);
    initSnackbarContext(app, options);
  },
};
