import { App, Plugin, createApp } from 'vue';
import Dialog from './components/Dialog.vue';

export type DialogButton = {
  key: string;
  title: string;
  color?: string;
  variant?: string;
};

export function initDialogsContext(app: App, options: { vuetify: Plugin }) {
  function warn(text: string, title?: string) {
    return createDialog(title || 'Warning', text, [{ key: 'ok', title: 'OK', color: 'warning' }], 'warning');
  }

  function error(text: string, title?: string) {
    return createDialog(title || 'Error', text, [{ key: 'ok', title: 'OK', color: 'error' }], 'error');
  }

  function info(text: string, title?: string) {
    return createDialog(title || 'Info', text, [{ key: 'ok', title: 'OK', color: 'info' }], 'info');
  }

  function success(text: string, title?: string) {
    return createDialog(title || 'Success', text, [{ key: 'ok', title: 'OK', color: 'success' }], 'success');
  }

  function createDialog(title: string, text: string, buttons?: DialogButton[], level?: string) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyAndNotNull(title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(text)) throw new Error('text is required');

      if (buttons) {
        buttons.forEach(validateButton);
      }

      return new Promise((resolve, reject) => {
        const _app = createApp(Dialog, {
          title,
          text,
          buttons,
          level,
          onCloseDialog: (value: any) => {
            resolve(value);
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

  app.config.globalProperties.$dialog = {
    createDialog,
    warn,
    error,
    info,
    success,
  };
}

function validateButton(button: any, index: number) {
  if (!button) {
    throw new Error(`button at index ${index} is not defined`);
  }

  if (!isNotEmptyAndNotNull(button.key)) {
    throw new Error(`button at index ${index} has no key`);
  }

  if (!isNotEmptyAndNotNull(button.title)) {
    throw new Error(`button at index ${index} has no title`);
  }
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
