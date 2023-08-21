import Notifier from 'Notifier';
import PluginContext from 'PluginContext';
import { CreateBottomSheetOptions } from 'types';
import { createApp } from 'vue';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
import BottomSheet from './components/BottomSheet.vue';

export default class BottomSheets extends Notifier {
  initContext(): void {
    this._app.config.globalProperties.$bottomSheet = {
      create: createBottomSheet,
    };
  }
}

export function createList(items: VListItem['$props'][], options?: CreateBottomSheetOptions) {
  return createBottomSheet({
    items,
    ...options,
  });
}

export function createBottomSheet(options: CreateBottomSheetOptions) {
  try {
    if (options.items && options.dialogOptions) {
      throw new Error('You can not use items and dialogOptions together');
    }

    if (options.dialogOptions) {
      if (!isNotEmptyAndNotNull(options.dialogOptions.title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(options.dialogOptions.text)) throw new Error('text is required');
    }

    const div = document.createElement('div');
    return new Promise((resolve, reject) => {
      const _app = createApp(BottomSheet, {
        items: options?.items,
        bottomSheetOptions: options,
        onCloseBottomSheet: (value: string | boolean) => {
          resolve(value);
          _app.unmount();
          document.body.removeChild(div);
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

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
