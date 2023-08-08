import { PluginOptions } from 'types';
import { App, Plugin } from 'vue';
import { initDialogsContext } from './dialogs';
import { initSnackbarContext } from './snackbars';

export const Vuetify3Dialog: Plugin = {
  install(app: App, options: PluginOptions) {
    if (!options) {
      console.warn('Dialogs plugin requires options');
      return;
    }

    if (!options.vuetify) {
      console.warn('Dialogs plugin requires vuetify plugin, please declare it with Vue.use(Dialogs, { vuetify })');
      return;
    }

    try {
      initDialogsContext(app, options);
      initSnackbarContext(app, options);
    } catch(err: any) {
      console.error(`[Vuetify3Dialog]  {err.message} [${err.stack}]`);
    }
  },
};
