import PluginContext from 'PluginContext';
import { BasicDialogOptions, ConfirmDialogOptions, CreateDialogOptions } from 'types';
import { h, render } from 'vue';
import Dialog from './components/Dialog.vue';

export default class Dialogs {
  public static initContext(): void {
    PluginContext.getApp().config.globalProperties.$dialog = {
      create: createDialog,
      confirm: confirmDialog,
      warning: warningDialog,
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
      const props = {
        title: options.title,
        text: options.text,
        buttons: options.buttons,
        icon: options.icon,
        level: options.level,
        customComponent: options.customComponent,
        dialogOptions: options.dialogOptions ||
          PluginContext.getPluginOptions()?.defaults?.dialog?.component || {
            width: '400px',
          },
        cardOptions: options.cardOptions || PluginContext.getPluginOptions()?.defaults?.dialog?.card || undefined,
        onCloseDialog: (value: string | boolean) => {
          resolve(value);
        },
      };

      const vNode = h(Dialog, props);
      vNode.appContext = PluginContext.getApp()._context;
      render(vNode, div);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

export function warningDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Warning',
    text: options.text,
    icon: options.icon,
    buttons: [{ key: 'ok', title: 'OK', color: 'warning', ...options.buttonOptions }],
    level: 'warning',
    cardOptions: options.cardOptions,
  });
}

export function errorDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Error',
    text: options.text,
    icon: options.icon,
    buttons: [{ key: 'ok', title: 'OK', color: 'error', ...options.buttonOptions }],
    level: 'error',
    cardOptions: options.cardOptions,
  });
}

export function infoDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Info',
    text: options.text,
    icon: options.icon,
    buttons: [{ key: 'ok', title: 'OK', color: 'info', ...options.buttonOptions }],
    level: 'info',
    cardOptions: options.cardOptions,
  });
}

export function successDialog(options: BasicDialogOptions) {
  return createDialog({
    title: options.title || 'Success',
    text: options.text,
    icon: options.icon,
    buttons: [{ key: 'ok', title: 'OK', color: 'success', ...options.buttonOptions }],
    level: 'success',
    cardOptions: options.cardOptions,
  });
}

export function confirmDialog(options: ConfirmDialogOptions) {
  return createDialog({
    title: options.title,
    text: options.text,
    buttons: [
      { key: false, title: options.cancelText || 'Cancel', color: 'grey', ...options.cancelButtonOptions },
      {
        key: true,
        title: options.confirmationText || 'Confirm',
        color: 'warning',
        ...options.confirmationButtonOptions,
      },
    ],
    icon: options.icon,
    level: options.level,
    cardOptions: options.cardOptions,
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
