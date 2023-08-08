import { CreateDialogOptions, Level, PluginOptions } from 'types';
import { App, createApp } from 'vue';
import Dialog from './components/Dialog.vue';

export function initDialogsContext(app: App, pluginOptions: PluginOptions) {
  function warn(text: string, title?: string, cardOptions?: any) {
    return create({
      title: title || 'Warning',
      text,
      buttons: [{ key: 'ok', title: 'OK', color: 'warning' }],
      level: 'warning',
      cardOptions,
    });
  }

  function error(text: string, title?: string, cardOptions?: any) {
    return create({
      title: title || 'Error',
      text,
      buttons: [{ key: 'ok', title: 'OK', color: 'error' }],
      level: 'error',
      cardOptions,
    });
  }

  function info(text: string, title?: string, cardOptions?: any) {
    return create({
      title: title || 'Info',
      text,
      buttons: [{ key: 'ok', title: 'OK', color: 'info' }],
      level: 'info',
      cardOptions,
    });
  }

  function success(text: string, title?: string, cardOptions?: any) {
    return create({
      title: title || 'Success',
      text,
      buttons: [{ key: 'ok', title: 'OK', color: 'success' }],
      level: 'success',
      cardOptions,
    });
  }

  function confirm(
    title: string,
    text: string,
    level?: Level,
    cancelText?: string,
    confirmationText?: string,
    cardOptions?: any,
  ) {
    return create({
      title,
      text,
      buttons: [
        { key: false, title: cancelText || 'Cancel' },
        { key: true, title: confirmationText || 'Confirm', color: 'primary' },
      ],
      level,
      cardOptions,
    });
  }

  function create(options: CreateDialogOptions) {
    try {
      const div = document.createElement('div');

      if (!isNotEmptyAndNotNull(options.title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

      if (options.buttons) {
        options.buttons.forEach(validateButton);
      }

      return new Promise((resolve, reject) => {
        console.log(pluginOptions.defaults?.dialog?.card);
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

  app.config.globalProperties.$dialog = {
    create,
    confirm,
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

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
