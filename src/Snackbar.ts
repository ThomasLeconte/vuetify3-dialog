import PluginContext from 'PluginContext';
import { CreateNotifyOptions } from 'types';
import { h, render } from 'vue';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';
import Snackbar from './components/Snackbar.vue';

export default class SnackBar {
  public static initContext(): void {
    PluginContext.getApp().config.globalProperties.$notify = {
      create: createNotification,
      warning: notifyWarning,
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
    const potentialLocation =
      options.location ??
      options.notifyOptions?.location ??
      PluginContext.getPluginOptions()?.defaults?.notify?.location ??
      'top right';
    let locationY = potentialLocation.split(' ')[0] ?? 'top';
    let locationX = potentialLocation.split(' ')[1] ?? 'right';
    let div = document.createElement('div');

    if (!isNotEmptyAndNotNull(options.text) && !isNotEmptyAndNotNull(options.htmlContent))
      throw new Error('text or htmlContent is required');

    return new Promise((resolve, reject) => {
      const props = {
        text: options.text,
        htmlContent: options.htmlContent,
        level: options.level,
        location: potentialLocation,
        notifyOptions: options.notifyOptions ?? PluginContext.getPluginOptions()?.defaults?.notify ?? undefined,
        onCloseSnackbar: () => {
          resolve(true);
        },
      };

      const vNode = h(Snackbar, props);
      vNode.appContext = PluginContext.getApp()._context;
      render(vNode, div);

      const vuetifyDivOverlay = document.querySelector('.v-overlay-container');

      let margin = 0;

      if ((vuetifyDivOverlay as HTMLElement)?.childElementCount > 1) {
        for (let child of (vuetifyDivOverlay as HTMLElement).children) {
          if (
            child === (vuetifyDivOverlay as HTMLElement).lastElementChild ||
            !(
              child.classList.contains('v-snackbar--' + locationX) &&
              child.classList.contains('v-snackbar--' + locationY)
            )
          )
            continue;
          if ((child as HTMLElement).lastElementChild) {
            margin += ((child as HTMLElement).lastElementChild as HTMLElement).offsetHeight + 12;
          }
        }
      }

      if (margin > 0) {
        switch (locationY) {
          case 'top':
            (vuetifyDivOverlay?.lastElementChild as HTMLElement).style.marginTop = `${margin + 12}px`;
            break;
          case 'bottom':
            (vuetifyDivOverlay?.lastElementChild as HTMLElement).style.marginBottom = `${margin + 12}px`;
            break;
          default:
            throw new Error('location must be top or bottom');
        }
      }
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value?: string): boolean {
  return value !== undefined && value !== null && value.trim().length > 0 && value !== '';
}
