import { CreateNotifyOptions } from 'types';
import { App, Plugin, createApp } from 'vue';
import Snackbar from './components/Snackbar.vue';

export function initSnackbarContext(app: App, pluginOptions: { vuetify: Plugin }) {
  function warn(text: string, notifyOptions?: any) {
    return create({ text, level: 'warning', notifyOptions });
  }
  function error(text: string, notifyOptions?: any) {
    return create({ text, level: 'error', notifyOptions });
  }
  function info(text: string, notifyOptions?: any) {
    return create({ text, level: 'info', notifyOptions });
  }
  function success(text: string, notifyOptions?: any) {
    return create({ text, level: 'success', notifyOptions });
  }

  function create(options: CreateNotifyOptions) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

      return new Promise((resolve, reject) => {
        const _app = createApp(Snackbar, {
          text: options.text,
          level: options.level,
          location: options.location,
          notifyOptions: options.notifyOptions,
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

  app.config.globalProperties.$notify = {
    create,
    warn,
    error,
    info,
    success,
  };
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
