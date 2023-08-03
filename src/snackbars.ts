import { CreateNotifyOptions } from 'types';
import { App, Plugin, createApp } from 'vue';
import Snackbar from './components/Snackbar.vue';

export function initSnackbarContext(app: App, pluginOptions: { vuetify: Plugin }) {
  function warn(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create({ text, timeout, level: 'warning', variant, rounded });
  }
  function error(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create({ text, timeout, level: 'error', variant, rounded });
  }
  function info(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create({ text, timeout, level: 'info', variant, rounded });
  }
  function success(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create({ text, timeout, level: 'success', variant, rounded });
  }

  function create(options: CreateNotifyOptions) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');
      if (options.timeout && options.timeout < 0) throw new Error('timeout must be greater than 0');
      if (!options.variant) options.variant = 'elevated';
      if (typeof options.rounded === 'boolean' && options.rounded === true) options.rounded = 'pill';

      return new Promise((resolve, reject) => {
        const _app = createApp(Snackbar, {
          text: options.text,
          timeout: options.timeout,
          level: options.level,
          variant: options.variant,
          rounded: options.rounded,
          location: options.location,
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
      console.error(`[Dialogs] ${err.message} [${err.stack}]`);
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
