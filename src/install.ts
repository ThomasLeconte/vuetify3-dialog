import { App, Plugin } from 'vue';
import PluginContext from './PluginContext';
import { PluginOptions } from './types';
export const Vuetify3Dialog: Plugin = {
  install(app: App, options?: PluginOptions) {
    try {
      new PluginContext(app, options);
    } catch (err: any) {
      console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
    }
  },
};
