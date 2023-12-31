import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import { CreateDialogOptions, DialogButton, Level } from 'types';
import { createApp, createVNode, h, render } from 'vue';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import Dialog from './components/Dialog.vue';
import { VBtn } from 'vuetify/lib/components/index.mjs';

export default class Dialogs extends Notifier {
  initContext(): void {
    // let vNode = h(Dialog, { title: 'coucou', text: 'vuetify3-dialog' });
    // if (this._app && this._app._context) {
    //   console.log('app context');
    //   vNode.appContext = this._app._context;
    //   console.log(this._app._context);
    // }
    // render(vNode, document.createElement('div'));

    this._app.config.globalProperties.$dialog = {
      create: createDialog,
      confirm: confirmDialog,
      warn: warnDialog,
      error: errorDialog,
      info: infoDialog,
      success: successDialog,
    };
  }
}

export function createDialog(options: CreateDialogOptions) {
  try {
    const div = document.createElement('div');

    if (!options.customComponent) {
      if (!isNotEmptyAndNotNull(options.title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');
    } else {
      options.title = options.title || '';
      options.text = options.text || '';
    }

    if (options.buttons) {
      options.buttons.forEach(validateButton);
    }

    return new Promise((resolve, reject) => {
      const _app = createApp(Dialog, {
        title: options.title,
        text: options.text,
        buttons: options.buttons,
        level: options.level,
        customComponent: options.customComponent,
        dialogOptions:
          PluginContext.getPluginOptions().defaults?.dialog?.component || options.dialogOptions || undefined,
        cardOptions: options.cardOptions ||
          PluginContext.getPluginOptions().defaults?.dialog?.card || {
            location: 'center center',
            width: '400px',
          },
        onCloseDialog: (value: string | boolean) => {
          resolve(value);
          setTimeout(() => {
            _app.unmount();
            document.body.removeChild(div);
          }, 500);
        },
      });

      _app.use(PluginContext.getVuetify());

      document.body.appendChild(div);
      _app.mount(div);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

export function warnDialog(text: string, title?: string, cardOptions?: VCard['$props'], buttonOptions?: DialogButton) {
  return createDialog({
    title: title || 'Warning',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'warning', ...buttonOptions }],
    level: 'warning',
    cardOptions,
  });
}

export function errorDialog(text: string, title?: string, cardOptions?: VCard['$props'], buttonOptions?: DialogButton) {
  return createDialog({
    title: title || 'Error',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'error', ...buttonOptions }],
    level: 'error',
    cardOptions,
  });
}

export function infoDialog(text: string, title?: string, cardOptions?: VCard['$props'], buttonOptions?: DialogButton) {
  return createDialog({
    title: title || 'Info',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'info', ...buttonOptions }],
    level: 'info',
    cardOptions,
  });
}

export function successDialog(
  text: string,
  title?: string,
  cardOptions?: VCard['$props'],
  buttonOptions?: DialogButton,
) {
  return createDialog({
    title: title || 'Success',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'success', ...buttonOptions }],
    level: 'success',
    cardOptions,
  });
}

export function confirmDialog(
  title: string,
  text: string,
  level?: Level,
  cancelText?: string,
  confirmationText?: string,
  cardOptions?: VCard['$props'],
  cancelButtonOptions?: DialogButton,
  confirmationButtonOptions?: DialogButton,
) {
  return createDialog({
    title,
    text,
    buttons: [
      { key: false, title: cancelText || 'Cancel', color: 'grey', ...cancelButtonOptions },
      { key: true, title: confirmationText || 'Confirm', color: 'warning', ...confirmationButtonOptions },
    ],
    level,
    cardOptions,
  });
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

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
