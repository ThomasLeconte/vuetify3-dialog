import { App, Plugin, createApp } from 'vue';
import Dialog from './Dialog.vue';

export type DialogButton = {
  key: string;
  label: string;
  color?: string;
  variant?: string;
};

export const Dialogs: Plugin = {
  install(app: App, options: { vuetify: Plugin }) {
    if (!options) {
      throw new Error('Dialogs plugin requires options');
    }

    if (!options.vuetify) {
      throw new Error('Dialogs plugin requires vuetify plugin');
    }

    function createDialog(title: string, text: string, buttons?: DialogButton[]) {
      try {
        const div = document.createElement('div');

        if (!isNotEmptyOrNull(title)) throw new Error('title is required');
        if (!isNotEmptyOrNull(text)) throw new Error('text is required');

        if (buttons) {
          buttons.forEach(validateButton);
        }

        return new Promise((resolve, reject) => {
          const _app = createApp(Dialog, {
            title,
            text,
            buttons,
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

    app.config.globalProperties.$createDialog = createDialog;
  },
};

function validateButton(button: any, index: number) {
  if (!button) {
    throw new Error(`button at index ${index} is not defined`);
  }

  if (!isNotEmptyOrNull(button.key)) {
    throw new Error(`button at index ${index} has no key`);
  }

  if (!isNotEmptyOrNull(button.title)) {
    throw new Error(`button at index ${index} has no title`);
  }
}

function isNotEmptyOrNull(value: string): boolean {
  return value !== null && value.trim().length > 0 && value !== '';
}
