import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import { CreateNotifyOptions } from 'types';
import { createApp } from 'vue';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';
import Snackbar from './components/Snackbar.vue';

let snacksByLocation = { top: 0, bottom: 0 };

export default class SnackBar extends Notifier {
  initContext(): void {
    this._app.config.globalProperties.$notify = {
      create: createNotification,
      warn: notifyWarning,
      error: notifyError,
      info: notifyInfo,
      success: notifySuccess,
    };
  }
}

export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'warning', notifyOptions });
}
export function notifyError(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'error', notifyOptions });
}
export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'info', notifyOptions });
}
export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']) {
  return createNotification({ text, level: 'success', notifyOptions });
}

export function createNotification(options: CreateNotifyOptions) {
  try {
    let location = (options.location ?? 'top right').split(' ')[0] || 'top';
    let div = document.createElement('div');

    if (!isNotEmptyAndNotNull(options.text)) throw new Error('text is required');

    return new Promise((resolve, reject) => {
      const _app = createApp(Snackbar, {
        text: options.text,
        level: options.level,
        location: options.location || 'top right',
        notifyOptions: options.notifyOptions || PluginContext.getPluginOptions().defaults?.notify || undefined,
        onCloseSnackbar: () => {
          resolve(true);
          setTimeout(() => {
            _app.unmount();
            document.body.removeChild(div);
            switch (location) {
              case 'top':
                snacksByLocation.top--;
                break;
              case 'bottom':
                snacksByLocation.bottom--;
                break;
              default:
                throw new Error('location must be top or bottom');
            }
          }, 500);
        },
      });

      _app.use(PluginContext.getVuetify());

      document.body.appendChild(div);
      _app.mount(div);

      console.log('open', snacksByLocation);

      const vuetifyDivOverlay = document.querySelector('.v-overlay-container');
      if (location === 'top' && snacksByLocation.top > 0)
        (vuetifyDivOverlay?.lastElementChild as HTMLElement).style.marginTop = `${60 * snacksByLocation.top}px`;

      switch (location) {
        case 'top':
          snacksByLocation.top++;
          break;
        case 'bottom':
          snacksByLocation.bottom++;
          break;
        default:
          throw new Error('location must be top or bottom');
      }
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
