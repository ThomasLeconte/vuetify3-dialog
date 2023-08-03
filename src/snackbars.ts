import { App, Plugin, createApp } from 'vue';
import Snackbar from './components/Snackbar.vue';

export function initSnackbarContext(app: App, options: { vuetify: Plugin }) {
  function warn(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create(text, timeout, 'warning', variant, rounded);
  }
  function error(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create(text, timeout, 'error', variant, rounded);
  }
  function info(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create(text, timeout, 'info', variant, rounded);
  }
  function success(text: string, timeout: number = 5000, variant?: string, rounded: string | boolean = false) {
    return create(text, timeout, 'success', variant, rounded);
  }

  function create(
    text: string,
    timeout?: number,
    level?: string,
    variant?: string,
    rounded?: string | boolean,
    location?: string,
  ) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyAndNotNull(text)) throw new Error('text is required');
      if (timeout && timeout < 0) throw new Error('timeout must be greater than 0');
      if (!variant) variant = 'elevated';
      if (typeof rounded === 'boolean' && rounded === true) rounded = 'pill';

      return new Promise((resolve, reject) => {
        const _app = createApp(Snackbar, {
          text,
          timeout,
          level,
          variant,
          rounded,
          location,
          onCloseSnackbar: () => {
            resolve(true);
            _app.unmount();
            document.body.removeChild(div);
          },
        });

        _app.use(options.vuetify);

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
