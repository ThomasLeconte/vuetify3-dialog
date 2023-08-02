import { App, Plugin, createApp } from 'vue';
import Snackbar from './components/Snackbar.vue';

export function initSnackbarContext(app: App, options: { vuetify: Plugin }) {
  function createSnackbar(text: string, timeout?: number, level?: string, variant?: string) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyOrNull(text)) throw new Error('text is required');

      return new Promise((resolve, reject) => {
        const _app = createApp(Snackbar, {
          text,
          timeout,
          level,
          variant,
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

  app.config.globalProperties.$snackbar = {
    createSnackbar,
  };
}

function isNotEmptyOrNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
