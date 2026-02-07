import { PluginOptions } from 'types';
import { App } from 'vue';
import { createBottomSheet, createBottomSheetList } from './components/BottomSheet';
import {
  confirmDialog,
  createDialog,
  errorDialog,
  infoDialog,
  successDialog,
  warningDialog,
} from './components/Dialog';
import { createNotification, notifyError, notifyInfo, notifySuccess, notifyWarning } from './components/Snackbar';

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

    this.initComponentsContext();
  }

  private initComponentsContext(): void {
    // App dialog properties
    PluginContext.getApp().config.globalProperties.$dialog = {
      create: createDialog,
      confirm: confirmDialog,
      warning: warningDialog,
      error: errorDialog,
      info: infoDialog,
      success: successDialog,
    };

    // App boottomSheet properties
    PluginContext.getApp().config.globalProperties.$bottomSheet = {
      create: createBottomSheet,
      createList: createBottomSheetList,
    };

    // App notify properties
    PluginContext.getApp().config.globalProperties.$notify = {
      create: createNotification,
      warning: notifyWarning,
      error: notifyError,
      info: notifyInfo,
      success: notifySuccess,
    };
  }

  static getPluginOptions(): PluginOptions {
    return PluginContext.pluginOptions;
  }

  static getApp(): App {
    return PluginContext.app;
  }
}
