import { PluginOptions } from 'types';
import { App } from 'vue';

export default class PluginContext {
  private static pluginOptions: PluginOptions;
  private static app: App;

  constructor(app: App, _pluginOptions?: PluginOptions) {
    if (!app) throw new Error('Error during initialization : app is required');
    PluginContext.app = app;

    const vuetify = app._context.mixins.find((mixin) => mixin.computed?.$vuetify);
    if (!vuetify)
      throw new Error('Error during initialization : vuetify is required. Please declare it with Vue.use(Vuetify)');

    if (_pluginOptions) PluginContext.pluginOptions = _pluginOptions;
  }

  static getPluginOptions(): PluginOptions {
    return PluginContext.pluginOptions;
  }

  static getApp(): App {
    return PluginContext.app;
  }
}
