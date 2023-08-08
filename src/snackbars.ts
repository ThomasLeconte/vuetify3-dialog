import { CreateNotifyOptions, PluginOptions } from 'types';
import { App, createApp } from 'vue';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';
import Snackbar from './components/Snackbar.vue';

let pluginOptions: PluginOptions;

export function initSnackbarContext(app: App, _pluginOptions: PluginOptions) {
  if (!app) throw new Error('Error during initialization : app is required');
  if (!_pluginOptions) throw new Error('Error during initialization : plugin options is required');
  if (!_pluginOptions.vuetify) throw new Error('Error during initialization : vuetify is required');

  pluginOptions = _pluginOptions;

  app.config.globalProperties.$notify = {
    create: createNotification,
    warn: notifyWarning,
    error: notifyError,
    info: notifyInfo,
    success: notifySuccess,
  };
}

export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'warning', notifyOptions });
}
export function notifyError(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'error', notifyOptions });
}
export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'info', notifyOptions });
}
export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'success', notifyOptions });
}

export function createNotification(options: CreateNotifyOptions) {
  try {
    const div = document.createElement('div');

    if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

    return new Promise((resolve, reject) => {
      const _app = createApp(Snackbar, {
        text: options.text,
        level: options.level,
        location: options.location,
        notifyOptions: options.notifyOptions || pluginOptions.defaults?.notify || undefined,
        onCloseSnackbar: () => {
          resolve(true);
          _app.unmount();
          document.body.removeChild(div);
        },
      });

      _app.use(pluginOptions.vuetify);

      document.body.appendChild(div);
      _app.mount(div);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
