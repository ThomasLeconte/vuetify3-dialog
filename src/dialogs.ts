import { CreateDialogOptions, Level, PluginOptions } from 'types';
import { App, createApp } from 'vue';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import Dialog from './components/Dialog.vue';

let pluginOptions: PluginOptions;

export function initDialogsContext(app: App, _pluginOptions: PluginOptions) {
  if (!app) throw new Error('Error during initialization : app is required');
  if (!_pluginOptions) throw new Error('Error during initialization : plugin options is required');
  if (!_pluginOptions.vuetify) throw new Error('Error during initialization : vuetify is required');

  pluginOptions = _pluginOptions;

  app.config.globalProperties.$dialog = {
    create: createDialog,
    confirm: confirmDialog,
    warn: warnDialog,
    error: errorDialog,
    info: infoDialog,
    success: successDialog,
  };
}

export function warnDialog(text: string, title?: string, cardOptions?: VCard['$props']) {
  return createDialog({
    title: title || 'Warning',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'warning' }],
    level: 'warning',
    cardOptions,
  });
}

export function errorDialog(text: string, title?: string, cardOptions?: VCard['$props']) {
  return createDialog({
    title: title || 'Error',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'error' }],
    level: 'error',
    cardOptions,
  });
}

export function infoDialog(text: string, title?: string, cardOptions?: VCard['$props']) {
  return createDialog({
    title: title || 'Info',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'info' }],
    level: 'info',
    cardOptions,
  });
}

export function successDialog(text: string, title?: string, cardOptions?: VCard['$props']) {
  return createDialog({
    title: title || 'Success',
    text,
    buttons: [{ key: 'ok', title: 'OK', color: 'success' }],
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
) {
  return createDialog({
    title,
    text,
    buttons: [
      { key: false, title: cancelText || 'Cancel', color: 'grey' },
      { key: true, title: confirmationText || 'Confirm', color: 'warning' },
    ],
    level,
    cardOptions,
  });
}

export function createDialog(options: CreateDialogOptions) {
  try {
    const div = document.createElement('div');

    if (!isNotEmptyAndNotNull(options.title)) throw new Error('title is required');
    if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

    if (options.buttons) {
      options.buttons.forEach(validateButton);
    }

    return new Promise((resolve, reject) => {
      const _app = createApp(Dialog, {
        title: options.title,
        text: options.text,
        buttons: options.buttons,
        level: options.level,
        dialogOptions: pluginOptions.defaults?.dialog?.component || undefined,
        cardOptions: options.cardOptions ||
          pluginOptions.defaults?.dialog?.card || {
            location: 'center center',
            width: '400px',
          },
        onCloseDialog: (value: string | boolean) => {
          resolve(value);
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
